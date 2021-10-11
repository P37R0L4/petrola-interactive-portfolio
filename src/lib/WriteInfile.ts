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

  const date = new Date();

  const userTmp: any = {};
  userTmp['name'] = user;
  userTmp['data'] = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
  userTmp['grade'] = 0;

  // add and save user
  recruiters.push(userTmp);
  saveData();
}

function update(id: any, params: any) {
  const user = recruiters.find((x: any) => x.id.toString() === id.toString());

  // set date updated
  user.dateUpdated = new Date().toISOString();

  // update and save
  Object.assign(user, params);
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
