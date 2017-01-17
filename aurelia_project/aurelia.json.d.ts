
export const name: string;
export const type: string;

export const platform: {
  id: string;
  displayName: string;
  output: string;
  index: string;
};

export const transpiler: {
  id: string;
  displayName: string;
  fileExtension: string;
  dtsSource: string[];
  source: string;
};

export const markupProcessor: {
  id: string;
  displayName: string;
  fileExtension: string;
  source: string;
};

export const cssProcessor: {
  id: string;
  displayName: string;
  fileExtension: string;
  source: string;
};

export const editor: {
  id: string;
  displayName: string;
};

export const unitTestRunner: {
  id: string;
  displayName: string;
  source: string;
};

export const paths: {
  root: string;
  resources: string;
  elements: string;
  attributes: string;
  valueConverters: string;
  bindingBehaviors: string;
};
export const testFramework: {
  id: string;
  displayName: string;
};

export const build: {
  targets: {
    id: string;
    displayName: string;
    output: string;
    index: string;
  }[];

  loader: {
    type: string;
    configTarget: string;
    includeBundleMetadataInConfig: string;
    plugins: {
      name: string;
      extensions: string[];
      stub: boolean;
    }[];
  };

  options: {
    minify: string;
    sourcemaps: string;
  };

  bundles: {
    name: string;
    source?: string[];
    prepend: string[];
    dependencies: string[] | {
      name: string;
      path: string;
      main: string;
      deps: string[];
      exports: string;
      resources: string[];
    }[];
  }[];
}

