#!/bin/bash
if [ -z "$1" ]; then
  echo "Usage: npm run add-migrate <migration_name>"
  exit 1
fi

# Create migration file
npx wrangler d1 migrations create serhii-test-db "$1"

# Get the latest migration file
LATEST_MIGRATION=$(ls -t prisma/migrations/*.sql | head -n 1)

# Generate the diff from migrations folder to current schema
npx prisma migrate diff \
  --from-local-d1 \
  --to-schema-datamodel ./prisma/schema.prisma \
  --script \
  --output "$LATEST_MIGRATION"

npx wrangler d1 migrations apply serhii-test-db --local
npx wrangler d1 migrations apply serhii-test-db --remote


echo "Migration created and populated and applied: $LATEST_MIGRATION"
