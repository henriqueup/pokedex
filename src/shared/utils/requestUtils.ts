export const batchRequests = async <P, R>(
  callbacks: ((params: P) => Promise<R>)[],
  params: P[],
  batchSize = 10
): Promise<R[]> => {
  const responses: R[] = [];

  for (let i = 0; i < callbacks.length; i += batchSize) {
    const batchResponses = await Promise.all(
      callbacks.slice(i, i + batchSize).map((callback, j) => callback(params[i + j]))
    );

    responses.push(...batchResponses);
  }

  return responses;
};
