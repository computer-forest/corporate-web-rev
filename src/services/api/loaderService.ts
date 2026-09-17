
type LoaderFunctions = {
  showLoader: () => void;
  hideLoader: () => void;
};

let loaderFunctions: LoaderFunctions | null = null;

export function registerLoader(functions: LoaderFunctions) {
  loaderFunctions = functions;
}

export function startGlobalLoader() {
  loaderFunctions?.showLoader();
}

export function stopGlobalLoader() {
  loaderFunctions?.hideLoader();
}
