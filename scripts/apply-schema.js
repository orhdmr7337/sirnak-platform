const fs = require('fs');
const https = require('https');

const token = process.env.SUPABASE_ACCESS_TOKEN;
const ref = process.env.SUPABASE_PROJECT_REF;
const sqlPath = process.argv[2] || 'supabase/schema.sql';

if (!token || !ref) {
  console.error('Set SUPABASE_ACCESS_TOKEN and SUPABASE_PROJECT_REF env vars');
  process.exit(1);
}

function splitStatements(sql) {
  const statements = [];
  let current = '';
  let inString = false;
  let stringChar = '';
  let inDollar = false;
  let dollarTag = '';

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    const next = sql[i + 1];

    if (inString) {
      current += ch;
      if (ch === stringChar && sql[i - 1] !== '\\') {
        inString = false;
      }
      continue;
    }

    if (inDollar) {
      current += ch;
      if (ch === '$' && current.endsWith('$' + dollarTag + '$')) {
        // Found closing tag, but we need to check if it's at the end of the block
        // Simple check: if next chars are semicolon or whitespace+semicolon
      }
      // Simplified: we don't have dollar-quoted strings in our schema
      continue;
    }

    if ((ch === "'" || ch === '"') && sql[i - 1] !== '\\') {
      inString = true;
      stringChar = ch;
      current += ch;
      continue;
    }

    if (ch === '-' && next === '-') {
      // Skip single-line comment
      while (i < sql.length && sql[i] !== '\n') i++;
      continue;
    }

    if (ch === '/' && next === '*') {
      // Skip multi-line comment
      i += 2;
      while (i < sql.length && !(sql[i] === '*' && sql[i + 1] === '/')) i++;
      i++;
      continue;
    }

    current += ch;

    if (ch === ';') {
      const trimmed = current.trim();
      if (trimmed) {
        statements.push(trimmed);
      }
      current = '';
    }
  }

  const last = current.trim();
  if (last) statements.push(last);

  return statements.filter((s) => s.length > 0);
}

function applyMigration(query, name) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query, name });
    const options = {
      hostname: 'api.supabase.com',
      path: `/v1/projects/${ref}/database/migrations`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
      timeout: 120000,
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(data);
    req.end();
  });
}

async function main() {
  const sql = fs.readFileSync(sqlPath, 'utf8');
  const statements = splitStatements(sql);
  console.log(`Found ${statements.length} statements`);

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    const firstLine = stmt.split('\n')[0].trim();
    const name = `migration-${i + 1}`;
    process.stdout.write(`[${i + 1}/${statements.length}] ${firstLine.substring(0, 60)}... `);

    try {
      await applyMigration(stmt, name);
      console.log('OK');
    } catch (err) {
      console.log('FAILED');
      console.error(err.message);
      // Some statements may fail if objects already exist; continue
      if (!err.message.includes('already exists') && !err.message.includes('duplicate')) {
        process.exit(1);
      }
    }
  }

  console.log('Done');
}

main();
