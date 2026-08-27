/* Konfiguracije wizarda — kljucevi pokazuju na messages/me.json + en.json */
export type Field = {
  name: string; k: string;
  type: 'text' | 'textarea' | 'email' | 'number' | 'select' | 'file' | 'radio' | 'checkbox';
  helpKey?: string;
  options?: {value: string; k: string; dk?: string}[];
};
export type Step = {titleKey: string; subKey?: string; grid?: boolean; fields: Field[]};
export type WizardConfig = {id: string; endpoint: string; steps: Step[]; submitKey: string; doneKey: string};

const TA = 'textarea' as const;
const q = (n: number, name: string): Field => ({name, k: `eq${n}`, type: TA});
const cq = (n: number, name: string, type: Field['type'] = TA): Field => ({name, k: `cq${n}`, type});

export const employerWizard: WizardConfig = {
  id: 'wiz-emp', endpoint: '/api/inquiry', submitKey: 'em_submit', doneKey: 'em_done',
  steps: [
    {titleKey: 'est1', subKey: 'wz_note', grid: true, fields: [
      {name: 'company', k: 'em_f1', type: 'text'},
      {name: 'industry', k: 'em_f2', type: 'text'},
      {name: 'role', k: 'em_f3', type: 'text'},
      {name: 'headcount', k: 'em_f4', type: 'number'},
      {name: 'contact_person', k: 'em_f5', type: 'text'},
      {name: 'contact', k: 'em_f6', type: 'text'}
    ]},
    {titleKey: 'est2', subKey: 'eq_na', fields: [q(1, 'q1'), q(2, 'q2'), q(3, 'q3')]},
    {titleKey: 'est3', fields: [q(4, 'q4'), q(5, 'q5'), q(6, 'q6'), q(7, 'q7'), q(8, 'q8')]},
    {titleKey: 'est4', fields: [q(9, 'q9'), q(10, 'q10'), q(11, 'q11'), q(12, 'q12')]},
    {titleKey: 'est5', fields: [q(13, 'q13'), {...q(14, 'q14'), helpKey: 'eq14_h'}, q(15, 'q15'), q(16, 'q16')]},
    {titleKey: 'est6', fields: [q(17, 'q17'), q(18, 'q18'), {name: 'q19', k: 'eq19', type: 'text'}, q(20, 'q20')]},
    {titleKey: 'est7', fields: [
      {name: 'q21', k: 'eq21', type: 'text'}, q(22, 'q22'),
      {name: 'consent', k: 'em_consent', type: 'checkbox'}
    ]}
  ]
};

export const candidateWizard: WizardConfig = {
  id: 'wiz-cand', endpoint: '/api/apply', submitKey: 'ca_submit', doneKey: 'ca_done',
  steps: [
    {titleKey: 'cst1', subKey: 'wz_note', grid: true, fields: [
      {name: 'full_name', k: 'ca_f1', type: 'text'},
      {name: 'birth_year', k: 'ca_f2', type: 'text'},
      {name: 'phone', k: 'ca_f3', type: 'text'},
      {name: 'email', k: 'ca_f4', type: 'email'},
      {name: 'work_status', k: 'cq_status', type: 'select', options: [
        {value: '', k: 'cq_sel'}, {value: 'zaposlen', k: 'cqs1'}, {value: 'nezaposlen', k: 'cqs2'},
        {value: 'student', k: 'cqs3'}, {value: 'freelancer', k: 'cqs4'}, {value: 'drugo', k: 'cqs5'}
      ]}
    ]},
    {titleKey: 'cst2', fields: [cq(1, 'q1'), cq(2, 'q2'), cq(3, 'q3', 'text')]},
    {titleKey: 'cst3', fields: [cq(4, 'q4'), cq(5, 'q5'), cq(6, 'q6'), {...cq(7, 'q7'), helpKey: 'cq7_h'}]},
    {titleKey: 'cst4', fields: [cq(8, 'q8'), cq(9, 'q9'), cq(10, 'q10')]},
    {titleKey: 'cst5', fields: [cq(11, 'q11'), cq(12, 'q12'), cq(13, 'q13'), cq(14, 'q14')]},
    {titleKey: 'cst6', fields: [cq(15, 'q15', 'text'), cq(16, 'q16'), cq(17, 'q17')]},
    {titleKey: 'cst7', fields: [cq(18, 'q18'), cq(19, 'q19')]},
    {titleKey: 'cst8', fields: [
      cq(20, 'q20'),
      {name: 'cv', k: 'ca_f6', type: 'file'},
      {name: 'urgency', k: 'ca_status', type: 'radio', options: [
        {value: 'odmah', k: 'ca_st1', dk: 'ca_st1d'},
        {value: 'otvoren', k: 'ca_st2', dk: 'ca_st2d'},
        {value: 'razgledam', k: 'ca_st3', dk: 'ca_st3d'}
      ]},
      {name: 'consent', k: 'ca_consent', type: 'checkbox'}
    ]}
  ]
};
