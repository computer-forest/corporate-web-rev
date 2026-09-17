// Bootstrap JS file does not provide TypeScript declaration for this ("bootstrap/dist/js/bootstrap.bundle.min.js") direct import path:
// So TypeScript says (Error):
// implicitly has an 'any' type
// now after creating .d.ts file, our .d.ts file tells TypeScript: This module exists. Allow import.

declare module "bootstrap/dist/js/bootstrap.bundle.min.js";
