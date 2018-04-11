// @flow

export function convertModelToFormData(
  model: any,
  form: ?FormData = null,
  namespace: string = '',
): FormData {
  const formData = form || new FormData();

  Object.keys(model).forEach(val => {
    if (Array.isArray(model[val])) {
      for (let i = 0; i < model[val].length; i += 1) {
        const model2 = model[val][i];
        Object.keys(model2).forEach(val2 => {
          formData.append(`${namespace}[${val}][${i}][${val2}]`, model[val][i][val2]);
        });
      }
    } else {
      formData.append(`${namespace}[${val}]`, model[val]);
    }
  });

  return formData;
}
