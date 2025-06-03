import ora from 'ora';

export const getSpinner = (text: string) => {
  const spinner = ora({
    text: text + '\n',
    spinner: 'dots'
  });

  return spinner;
}