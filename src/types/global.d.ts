declare module "*.js" {
  const value: any;
  export default value;
}

// Sequelize instance type
declare module "@/lib/sequelize" {
  import { Sequelize } from "sequelize";
  const sequelize: Sequelize;
  export default sequelize;
}

// Dynamic module loading - automatically captures any .d.ts files
// in subdirectories of src/types
declare module "@types/*/*" {
  export * from "./*/*";
}
