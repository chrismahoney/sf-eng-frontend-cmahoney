import { readFile } from 'fs/promises';
const users = JSON.parse(
  await readFile(new URL('./users.json', import.meta.url))
);
const orgs = JSON.parse(
  await readFile(new URL('./orgs.json', import.meta.url))
);

function analyzeUserStats(userId) {
  const testUser = users.data[userId];
  const interested_in = testUser.interested_in;
  const matches = testUser.matches;

  // console.log(users.length + " users");

  console.log("--- USER ------------------------");
  console.log(`User: ${testUser.first_name} ${testUser.last_name}`);
  console.log("Interests: " + interested_in || 0);
  console.log("Matches: " + matches?.length || 0);

  let sortedMatches = matches.sort((a, b) => b.match_level - a.match_level);
  sortedMatches.forEach((match) => {
    //console.log(match);
    console.log(
      `${match.match_level} - ${match.role} ${match.user_interest !== match.role ? "(" + match.user_interest + ")" : ""} - ${match.org_name}`,
    );
  });

  console.log("\n--- WEIGHT AND VARIANCE ---");
  let matchStats = {};
  let matchesPerRole = {};
  let positionMatchDetails = {};
  matches.forEach((match) => {
    matchStats[match.match_level] = (matchStats[match.match_level] || 0) + 1;
    matchesPerRole[match.role] = (matchesPerRole[match.role] || 0) + 1;
    positionMatchDetails[match.role] = positionMatchDetails[match.role] || [];
    positionMatchDetails[match.role].push(match.match_level);
  });
  console.log(matchStats, matchesPerRole);

  console.log("User: Matches by Position match level");
  console.log(positionMatchDetails);

  console.log("\n--- POSITION SUCCESS ---");

  let matchLevels = [];
  let accumulator = 0;
  let totalAccumulator = 0;
  Object.keys(positionMatchDetails).forEach((key) => {
    matchLevels = positionMatchDetails[key];
    accumulator = 0;
    for (let i = 0; i < matchLevels.length; i++) {
      accumulator += matchLevels[i];
    }
    // Output average of match levels and count
    console.log(
      `-- ${key}:\n---- ${matchLevels.length} matches, grade: ${accumulator / matchLevels.length}`,
    );
    totalAccumulator += accumulator;
  });

  console.log("\n--- USER OVERALL SUCCESS ---");
  console.log(totalAccumulator / matches.length);
}

function analyzeOrgStats(orgId) {
  const testOrg = orgs.data[orgId];
  let roles = testOrg.roles;
  let matches = testOrg.matches;

  // console.log(orgs.length + " orgs");

  console.log("\n--- ORG ------------------------");
  console.log("Org: " + testOrg.org_name);

  let sortedMatches = matches.sort((a, b) => b.match_level - a.match_level);

  console.log("\n--- WEIGHT AND VARIANCE ---");
  let matchStats = {};
  let matchesPerRole = {};
  let positionMatchDetails = {};
  matches.forEach((match) => {
    matchStats[match.match_level] = (matchStats[match.match_level] || 0) + 1;
    matchesPerRole[match.matching_role] =
      (matchesPerRole[match.matching_role] || 0) + 1;
    positionMatchDetails[match.matching_role] =
      positionMatchDetails[match.matching_role] || [];
    positionMatchDetails[match.matching_role].push(match.match_level);
  });
  console.log(matchStats, matchesPerRole);

  //console.log("Org: Matches by Position match level");
  //console.log(positionMatchDetails);

  console.log("\n--- POSITION SUCCESS ---");

  let matchLevels = [];
  let accumulator = 0;
  let totalAccumulator = 0;
  Object.keys(positionMatchDetails).forEach((key) => {
    matchLevels = positionMatchDetails[key];
    accumulator = 0;
    for (let i = 0; i < matchLevels.length; i++) {
      accumulator += matchLevels[i];
    }
    // Output average of match levels and count
    console.log(
      `-- ${key}:\n---- ${matchLevels.length} matches, grade: ${accumulator / matchLevels.length}`,
    );
    totalAccumulator += accumulator;
  });

  console.log("\n--- ORG OVERALL SUCCESS ---");
  console.log(totalAccumulator / matches.length);
}

function countAndSortRoles(roles) {
  console.log("\n--- ROLES COUNTED, SORTED ---");
  const sortedRoles = roles.sort((a, b) => a.localeCompare(b));
  console.log(/*sortedRoles, */ sortedRoles.length + " sorted roles");
  const countedRoles = sortedRoles.reduce(
    (a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }),
    {},
  );
  console.log(countedRoles);
}

const testType = process.argv[2];
const testIndex = process.argv[3];

if (testType === "user") {
  analyzeUserStats(testIndex);
} else if (testType === "org") {
  analyzeOrgStats(testIndex);
} else {
  throw "No dataset specified";
}
console.log("Processing complete.");
