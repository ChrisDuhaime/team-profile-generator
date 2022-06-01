// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('../lib/Engineer.js');
const Manager = require('../lib/Manager.js');
const Intern = require('../lib/Intern.js');
const teamArr = [];
const generateTeamProfiles = require('./template.js');
const employeeQuestionsArr = [
  {
    type: 'list',
    name: 'employeeRole',
    message: 'Which type of team member would you like to add?',
    choices: ['Intern', 'Engineer', 'I dont want to add any more team members'],
  },
  //Engineer Questions
  {
    type: 'input',
    name: 'engineerName',
    message: 'What is the Engineer\'s name?',
    when: ({ employeeRole }) => employeeRole === "Engineer"
  },

  {
    type: 'input',
    name: 'engineerID',
    message: 'What is the Engineer\'s id?',
    when: ({ employeeRole }) => employeeRole === "Engineer"
  },

  {
    type: 'input',
    name: 'engineerEmail',
    message: 'What is the Engineer\'s email?',
    when: ({ employeeRole }) => employeeRole === "Engineer"
  },

  {
    type: 'input',
    name: 'engineerGithub',
    message: 'What is the Engineer\'s github username?',
    when: ({ employeeRole }) => employeeRole === "Engineer"
  },
  //Intern Questions
  {
    type: 'input',
    name: 'internName',
    message: 'What is the Intern\'s name?',
    when: ({ employeeRole }) => employeeRole === "Intern"
  },

  {
    type: 'input',
    name: 'internID',
    message: 'What is the Intern\'s id?',
    when: ({ employeeRole }) => employeeRole === "Intern"
  },

  {
    type: 'input',
    name: 'internEmail',
    message: 'What is the Intern\'s email?',
    when: ({ employeeRole }) => employeeRole === "Intern"
  },

  {
    type: 'input',
    name: 'internSchool',
    message: 'What is the Intern\'s school?',
    when: ({ employeeRole }) => employeeRole === "Intern"
  }
];
const managerQuestionsArr = [
  {
    type: 'input',
    name: 'managerName',
    message: 'What is your Team Managers name?',
  },
  {
    type: 'input',
    name: 'managerID',
    message: 'What is your Team Manager ID?',
  },
  {
    type: 'input',
    name: 'managerEmail',
    message: 'What is your Manager\'s email',
  },
  {
    type: 'input',
    name: 'managerOfficeNumber',
    message: 'What is the Team Manager\'s Office number?',
  }
];


const handleManagerQuestions = (mgrQuestions, empQuestions) => {
    inquirer.prompt(mgrQuestions)
      .then((answers) => {
        console.log('ANSWERS: ' + JSON.stringify(answers));
        const mgrInstance = new Manager(answers.managerName, answers.managerEmail, answers.managerID, answers.managerOfficeNumber);
        console.log('MGR_INSTANCE: ' + mgrInstance.getName());
        teamArr.push(mgrInstance);
      })
      .then(() => handleEmployeeQuestions(empQuestions));
}

const handleEmployeeQuestions = (questions) => {
  
    inquirer.prompt(questions)
      .then(answers => {
        //break the recursion and create HTML
        if (answers.employeeRole === 'I dont want to add any more team members'){
          createHTMLFile(teamArr);
          return;
        } else {
          if (answers.employeeRole === 'Engineer') {
            const engInstance = new Engineer(answers.engineerName, answers.engineerEmail, answers.engineerID, answers.engineerGithub);
            teamArr.push(engInstance);
          } else if (answers.employeeRole === 'Intern') {
            const intInstance = new Intern(answers.internName, answers.internEmail, answers.internID, answers.internSchool);
            console.log('Intern_INSTANCE: ' + intInstance.school);
            teamArr.push(intInstance);
          }
        }
        handleEmployeeQuestions(questions);
      });
}


const createHTMLFile = function (team)  {
  fs.writeFileSync('index.html', generateTeamProfiles(team), 'UTF-8');
}

handleManagerQuestions(managerQuestionsArr, employeeQuestionsArr);

