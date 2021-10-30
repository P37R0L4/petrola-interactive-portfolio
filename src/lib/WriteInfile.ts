import fs from 'fs';
import path from 'path';

// recruiters in JSON file for simplicity, store in a db for production applications
const jsonFile = path.join(
  process.cwd(),
  'public',
  'samples',
  'accessData.json'
);
let recruiters = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

export const recruitersRepo = {
  getAll: () => recruiters,
  getById: (id: any) =>
    recruiters.find((x: any) => x.id.toString() === id.toString()),
  find: (x: any) => recruiters.find(x),
  create,
  update,
  updateGame,
  delete: _delete,
};

function create(user: any) {
  /**
   *
   * {
        "name": "bunblebee",
        "data": "13-12-2034",
        "grade": 9.4
    },
   */

  const userTmp: any = {};
  userTmp['id'] = recruiters.length + 1;
  userTmp['name'] = user;
  userTmp['data'] = new Date().getTime() / 1000;
  userTmp['grade'] = 0;
  userTmp['game'] = { position: 50, started: false, minigamePoints: 0 };

  // add and save user
  recruiters.push(userTmp);
  saveData();
}

function update(id: any, params: any, value: any) {
  const recruiter = recruiters.find(
    (x: any) => x.id.toString() === id.toString()
  );

  // set date updated
  // recruiter[params] = value;

  // update and save
  // Object.assign(recruiter, params);
  // saveData();
}

function updateGame(id: any, params: string, value: any) {
  const recruiter = recruiters.find(
    (x: any) => x.id.toString() === id.toString()
  );

  // set date updated
  if (params === 'started') {
    recruiter['game'][params] = Number(value);
  } else if (params === 'position') {
    if (recruiter['game'][params] > 10 && recruiter['game'][params] < 90) {
      recruiter['game'][params] = recruiter['game'][params] + Number(value);
    } else if (recruiter['game'][params] >= 90) {
      recruiter['game'][params] = 11;
    } else if (recruiter['game'][params] <= 0) {
      recruiter['game'][params] = 89;
    }
  }

  // update and save
  saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id: any) {
  // filter out deleted user and save
  recruiters = recruiters.filter((x: any) => x.id.toString() !== id.toString());
  saveData();
}

// private helper functions

function saveData() {
  fs.writeFileSync(jsonFile, JSON.stringify(recruiters, null, 4));
}
