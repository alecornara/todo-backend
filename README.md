# React + Vite

Este proyecto utiliza React junto con Vite para ofrecer un entorno de desarrollo rápido y moderno, con soporte para HMR (Hot Module Replacement) y configuración básica de ESLint.

Actualmente, hay disponibles dos plugins oficiales:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) utiliza [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) utiliza [SWC](https://swc.rs/)

## React Compiler

El React Compiler no está habilitado en esta plantilla debido a su impacto en el rendimiento durante el desarrollo y la compilación.  
Para agregarlo, consulta la documentación oficial:

https://react.dev/learn/react-compiler/installation

## Ampliando la configuración de ESLint

Si estás desarrollando una aplicación para producción, se recomienda utilizar TypeScript con reglas de linting basadas en tipos.

Puedes consultar la plantilla oficial de TypeScript para aprender cómo integrar TypeScript y `typescript-eslint` en tu proyecto:

https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts
