export const normalizedTasks = [
  { id: 0, status: 0, clientInfo: 'молодец', taskType: 0 },
  { id: 1, status: 1, clientInfo: 'не молодец', taskType: 2 },
];

export const meetings = [
  {
    id: 0,
    task: 0,
    start: '2020-07-12 19:30',
    end: '2020-07-12 19:30',
    theme: 'созвон по поводу деталей',
    comment: 'по плану',
    result: 'Успех',
    resultComment: '',
  },
  {
    id: 1,
    task: 0,
    start: '2020-07-16 19:30',
    end: '2020-07-16 20:30',
    theme: 'созвон по поводу деталей',
    comment: 'по плану',
    result: 'Успех',
    resultComment: '',
  },
];

export const statuses = [
  { id: 0, status: 'Планирование' },
  { id: 1, status: 'В работе' },
  { id: 2, status: 'Выполнена' },
];

export const taskTypes = [
  { id: 0, taskType: 'Потенциал' },
  { id: 1, taskType: 'Контакт' },
  { id: 2, taskType: 'ЦЗ' },
  { id: 3, taskType: 'РКМ' },
  { id: 4, taskType: 'Информационная' },
];
