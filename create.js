#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Función para ejecutar comandos
const exec = (command, options = {}) => {
  execSync(command, { stdio: "inherit", ...options });
};

// Crear estructura de carpetas
const createFolders = () => {
  fs.mkdirSync("src", { recursive: true });
  fs.mkdirSync(path.join("src", "middleware"), { recursive: true });
  fs.mkdirSync(path.join("src", "controllers"), { recursive: true });
  fs.mkdirSync(path.join("src", "validations"), { recursive: true });
};

// Crear archivos iniciales
const createFiles = () => {
  const indexJsContent = `
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
`;
  fs.writeFileSync(path.join("src", "index.js"), indexJsContent);

  // Crear archivo gitignore
  const gitignoreContent = `
.env
`;
  fs.writeFileSync(".gitignore", gitignoreContent);
};

// Inicializar proyecto
const initProject = () => {
  exec("npm init -y");
  exec("npm install express sequelize sequelize-cli");
  exec("npm install --save-dev nodemon");

  // Cambiar directorio a 'src' y ejecutar sequelize-cli init
  exec("npx sequelize-cli init", { cwd: path.resolve("src") }); // Cambiar directorio a 'src' y ejecutar sequelize-cli init
};

// Ejecutar funciones
createFolders();
createFiles();
initProject();

console.log("Proyecto Express con Sequelize configurado exitosamente.");
