const welcome = {
  title: 'W E L C O M E',
  text: 'Brazilian Jiu-Jitsu was formed from Kodokan judo ground fighting (newaza)' +
  'fundamentals that were taught by a number of individuals including Takeo Yano, ' +
  'Mitsuyo Maeda and Soshihiro Satake.',
  continue: 'CONTINUE'
};

const signIn = {
  userName: 'SHODAN',
  title: 'Select a country, enter the your phone number then press  continue!',
  countryPhone: ['Russia (+7)', 'Belorussia (+375)'],
  phoneText: 'Phone Number',
  passText: 'Password',
  alertSucces: {
    title: 'Регистрация прошла успешно',
    message: 'Для подтверждения регистрации введите код отправленный вам по SMS',
    details: ''
  },
  alertAutoris: {
    title: 'Авторизация прошла успешно',
    message: 'Добро пожаловать',
    details: ''
  },
  alertError: {
    title: 'Ошибка при регистрации',
    message: 'Не все поля заполнены корректно',
    details: ''
  }

};

const finishReg = {
  title: 'Enter the code\n and finish registration',
  codePlaceholder: '0000',
  alertSucces: {
    title: 'Код успешно подтвержден',
    message: 'Добро пожаловать',
    details: ''
  },
  alertError: {
    title: 'Ошибка подтверждения',
    message: 'Не все поля заполнены корректно',
    details: ''
  }
};

const eventsScreenText = {
  title: 'Events',
  eventsList: [
    {
      id: 1,
      image: 'https://s052d7666.fastvps-server.com/img/app/images/bjj_events-1.png',
      title: '3 Workouts to Build Explosive Strength \nfor BJJ. Breaking Muscle',
      pubDate: '1 hour ago',
      category: 'BJJ events'
    },
    {
      id: 2,
      image: 'https://s052d7666.fastvps-server.com/img/app/images/bjj_news-1.png',
      title: '4 Workouts to Build Explosive Strength \nfor BJJ. Breaking Muscle',
      pubDate: '4 hour ago',
      category: 'BJJ news'
    },
    {
      id: 3,
      image: 'https://s052d7666.fastvps-server.com/img/app/images/bjj_events-2.png',
      title: '5 Workouts to Build Explosive Strength \nfor BJJ. Breaking Muscle',
      pubDate: '5 hour ago',
      category: 'BJJ events',
    }
  ]
};

const profileScreenText = {
  about: ['About Student', 'About Trainer'],
  choose: 'Choose the tariff plan',
  funds: 'Funds on the account',
  statistic: 'Statistic',
  scored: 'Scored',
  commented: 'Commented',
  uploaded: 'Uploaded',
  fakeFullStats: [
    [
      {
        id: 1,
        img: 'https://s052d7666.fastvps-server.com/img/app/images/tren1.png',
        title: '1 Triangle Choke form Guard',
        score: 3
      },
      {
        id: 2,
        img: 'https://s052d7666.fastvps-server.com/img/app/images/tren2.png',
        title: '1 Choke form Triangle',
        score: 1
      },
      {
        id: 3,
        img: 'https://s052d7666.fastvps-server.com/img/app/images/tren3.png',
        title: '1 Guard Choke form ',
        score: 5
      }
    ],
    [
      {
        id: 4,
        img: 'https://s052d7666.fastvps-server.com/img/app/images/tren1.png',
        title: '2 Triangle Choke form Guard',
        score: 4
      },
      {
        id: 5,
        img: 'https://s052d7666.fastvps-server.com/img/app/images/tren2.png',
        title: '2 Choke form Triangle',
        score: 1
      },
      {
        id: 6,
        img: 'https://s052d7666.fastvps-server.com/img/app/images/tren3.png',
        title: '2 Guard Choke form ',
        score: 2
      }
    ],
    [
      {
        id: 7,
        img: 'https://s052d7666.fastvps-server.com/img/app/images/tren1.png',
        title: '3 Triangle Choke form Guard',
        score: 1
      },
      {
        id: 6,
        img: 'https://s052d7666.fastvps-server.com/img/app/images/tren2.png',
        title: '3 Choke form Triangle',
        score: 0
      },
      {
        id: 9,
        img: 'https://s052d7666.fastvps-server.com/img/app/images/tren3.png',
        title: '3 Guard Choke form ',
        score: 5
      }
    ]
  ]
};
const settingsScreenText = {
  account: 'Accaunt',
  editProfile: 'Edit Profile',
  changePass: 'Change password',
  becomeTtrainer: 'Become a coach (trainer)',
  logOut: 'Logout',
  global: 'Global',
  language: 'Language',
  pushNotify: 'Push Notification Settings',
  cellularData: 'Cellular Data options',
  support: 'Support',
  help: 'Help Center',
  problemReport: 'Report a problem',
  bugTracker: 'Bug tracker'
};

const TechniquesCategoryScreenText = {
  lessonsSort: [
    {name: ['Order by lesson name', 'asc', 'desc']},
    {training: ['Order by Training status', 'asc', 'desc']},
    {ratings: ['Order by lesson rating', 'asc', 'desc']},
    {difficulty: ['Order by lesson difficulty', 'asc', 'desc']},
  ],
  difficulty: {
    1: 'Fundamentals',
    2: 'Advanced',
    3: 'Gi',
    4: 'No Gi',
    5: 'Training'
  },
  progress: [
    ['not started', 'lightgrey'],
    ['awaiting', 'fire'],
    ['during', 'blue'],
    ['done', 'green']
  ],
  toFavorites: {
    title: 'Аre you sure',
    msg: 'Add or Remove this lesson in your favorites list?'
  },
  trainingMsg: {
    add: {
      title: 'Create a training?',
      msg: 'The training will be tied to this lesson'
    },
    close: {
      title: 'Close a training?',
      msg: 'The training will be closed forever'
    },
    completed: {
      title: 'Mark training completed?',
      msg: 'This training will pass to the status of completed'
    }

  }

};
const trainingsScreen = {
  beginMessages: {
    start: {
      title: 'Training has already begun.',
      msg: 'You can not start a new one.'
    },
    notStarted: {
      title: 'Training not started.',
      msg: 'Do you want to start training now?'
    },
    noTeachers: {
      title: 'Not find a teacher for training.',
      msg: 'Do you want to re-apply?'
    },
    awaiting: {
      title: 'Training begun.',
      msg: 'Expected response from the teacher.'
    },
    marked: {
      title: 'Training begun.',
      msg: 'Received a response from the teacher.'
    },
    denied: {
      title: 'Training is not available.',
      msg: 'Its impossible to begin training'
    },
    done: {
      title: 'Training completed.',
      msg: 'Its impossible to begin training'
    }
  },
    closeMessages: {
      start: {
        title: 'Training is not a teacher evaluation',
        msg: 'Are you sure you want to close this training session, open it again - it is impossible'
      },
      noTeachers: {
        title: 'Not find a teacher for training.',
        msg: 'Are you sure you want to close this training session, open it again - it is impossible'
      },
      awaiting: {
        title: 'Training is expected to teacher assessment',
        msg: 'Are you sure you want to close this training session, open it again - it is impossible'
      },
      marked: {
        title: 'Training assessed by the teacher',
        msg: 'Are you sure you want to close this training session'
      },
      denied: {
        title: 'Training is not available.',
        msg: 'Its impossible to close this training'
      },
      done: {
        title: 'Training completed.',
        msg: 'Its impossible to close this training'
      }
    }
};

const uploadScreen = {
  title: {
    videoEvaluation: 'Send video for evaluation',
    videoUploaded: 'Your video was successfully sent',
    videoScored: 'Rate a student`s video',
    videoNoScored: 'Nothing to evaluate'
  },
  errors: {
    noTitleOrDescr: ['Not all fields are filled in','Please fill in and try again']

  }

};

const materialsScreen = {
  demoUrl: 'https://s052d7666.fastvps-server.com/img/app/images/'
};

export {
  welcome,
  signIn,
  finishReg,
  eventsScreenText,
  profileScreenText,
  settingsScreenText,
  materialsScreen,
  TechniquesCategoryScreenText,
  trainingsScreen,
  uploadScreen
};
