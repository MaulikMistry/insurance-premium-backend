# SETUP PROJECT

<!-- Install Basic Dependencies -->
# Go to Root Directory and install below Dependencies:
    "npm install"
    "npm install -g migrate-mongo"

<!-- Setup DB -->
# Add MongoDB Connection URL in below files
    migrate-mongo-config.js
    .env

<!-- Run Migration and Seeder -->
# Run below command for migration seeder
    migrate-mongo up

<!-- Start Server and Project Run  -->
    "npm run dev"