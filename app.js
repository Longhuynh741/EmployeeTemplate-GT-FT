const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");
const { prompt } = require("inquirer");

const membersArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function promptUser() {
    return inquirer
        .prompt([
            {
                type: "list",
                name: "role",
                message: "What is your role?",
                choices: ["Engineer", "Manager", "Intern"],
            },
        ])
        .then(function (answers) {
            if (answers.role === "Engineer") {
                questionEngineer();
            } else if (answers.role === "Manager") {
                questionManager();
            } else if (answers.role === "Intern") {
                questionIntern();
            }
        });

    function questionEngineer() {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is your Engineer's name?",
                },
                {
                    type: "input",
                    name: "email",
                    message: "What is your Engineer's Email?",
                },
                {
                    type: "input",
                    name: "id",
                    message: "What is your Engineer's employee Id?",
                },
                {
                    type: "input",
                    name: "github",
                    message: "What is your Engineer's GitHub url?",
                },
                {
                    type: "list",
                    name: "continue",
                    message: "Do you want to continue to add more members?",
                    choices: ["No", "Yes"],
                },
            ])
            .then((answers) => {
                const engineer = new Engineer(
                    answers.name,
                    answers.email,
                    answers.id,
                    answers.github
                );
                membersArray.push(engineer);
                if (answers.continue === "Yes") {
                    promptUser();
                } else {
                
                    console.log(membersArray);
                    fs.writeFile(outputPath, render(membersArray), function (err) {
                        if (err) {
                            console.log(err);
                        }
                        console.log("Success");
                    });
                }
            });
    }
    function questionManager() {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is your Manager's name?",
                },
                {
                    type: "input",
                    name: "email",
                    message: "What is your Manager's Email?",
                },
                {
                    type: "input",
                    name: "id",
                    message: "What is your Manager's employee Id?",
                },
                {
                    type: "input",
                    name: "officeNumber",
                    message: "What is your office number?",
                },
                {
                    type: "list",
                    name: "continue",
                    message: "Do you want to continue to add more members?",
                    choices: ["No", "Yes"],
                },
            ])
            .then((answers) => {
                const manager = new Manager(
                    answers.name,
                    answers.email,
                    answers.id,
                    answers.officeNumber
                );
                membersArray.push(manager);
                if (answers.continue === "Yes") {
                    promptUser();
                } else {
                
                    console.log(membersArray);
                    fs.writeFile(outputPath, render(membersArray), function (err) {
                        if (err) {
                            console.log(err);
                        }
                        console.log("Success");
                    });
                }
            });
    }
    function questionIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is your Intern's name?",
            },
            {
                type: "input",
                name: "email",
                message: "What is your Intern's Email?",
            },
            {
                type: "input",
                name: "id",
                message: "What is your Intern's employee Id?",
            },
            {
                type: "input",
                name: "school",
                message: "What is your school's name?",
            },
            {
                type: "list",
                name: "continue",
                message: "Do you want to continue to add more members?",
                choices: ["No", "Yes"],
            },
        ]).then((answers) => {
            const intern = new Intern(
                answers.name,
                answers.email,
                answers.id,
                answers.school
            );
            membersArray.push(intern);
            if (answers.continue === "Yes") {
                promptUser();
            } else {
            
                console.log(membersArray);
                fs.writeFile(outputPath, render(membersArray), function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Success");
                });
            }
        });
    }
}

promptUser();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
