import {todayDate, dateDaysFromNow} from './dateHelper' 

export function calcIntervalEF(skill, grade) {
	let oldEF = skill.ef,
			newEF = 0;

	if (grade < 3) {
		skill.reps = 0;
		skill.interval = 0;
	}
	else {
		newEF = oldEF + (0.1 - (5-grade)*(0.08+(5-grade)*0.02));
		if (newEF < 1.3) { // 1.3 is the minimum EF
			skill.ef = 1.3;
		}
		else skill.ef = newEF;

		skill.reps += 1;

		switch (skill.reps) {
			case 1:
				skill.interval = 1;
				break;
			case 2:
				skill.interval = 6;
				break;
			default:
				skill.interval = Math.round((skill.reps - 1) * card.EF);
				break;
		}
	}	

	skill.nextDate = dateDaysFromNow(skill.interval);

	return skill
}

export function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}
