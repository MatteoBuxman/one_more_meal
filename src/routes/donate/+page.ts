import type { PageLoad } from "./$types.js";

export const ssr = false;

export const load: PageLoad = async () => {

  function fetchData(): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        resolve("Hello World");
      }, 5000);
    });

    return promise;
  }

  const title = fetchData();

  return {
    props: {
      title,
    },
  };
}

