/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

export function getLength(jumpsInMeters: number[]): number {
  return jumpsInMeters.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

export class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed?: boolean
  ) {}
}

export function getStudentStatus(student: Student): string {
  if (student.name === 'Sebastian') {
    if (student.handedInOnTime) {
      student.passed = true;
    } else {
      student.passed = false;
    }
  } else {
    student.passed = false;
  }

  return student.passed ? 'VG' : 'IG';
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

export class City {
  constructor(
    public name: string,
    public time: Date,
    public temperature: number
  ) {}
}

export function averageWeeklyTemperature(citys: City[]) {
  let dailyTemperatures = 0;
  const daysInAWeek = 7;
  const dateToCompare = new Date(604800000);
  const dateComparison = Date.now() - dateToCompare.getTime();

  citys.forEach((city) => {
    if (city.name === 'Stockholm') {
      if (city.time.getTime() > dateComparison) {
        dailyTemperatures += city.temperature;
      }
    }
  });

  return dailyTemperatures / daysInAWeek;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

export class Product {
  constructor(
    public name: string,
    public price: number,
    public amount: number,
    public description: string,
    public image: string,
    public parent: HTMLElement
  ) {}
}

export function showProduct(product: Product) {
  const container = document.createElement('div');

  const titleElement = document.createElement('h4');
  titleElement.innerHTML = product.name;
  container.appendChild(titleElement);

  const imageElement = document.createElement('img');
  imageElement.src = product.image;
  container.appendChild(imageElement);

  const priceElement = document.createElement('strong');
  priceElement.innerHTML = product.price.toString();
  container.appendChild(priceElement);

  product.parent.appendChild(container);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

export function presentStudents(students: Student[]) {
  for (const student of students) {
    const container = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    student.handedInOnTime
      ? (checkbox.checked = true)
      : (checkbox.checked = false);

    container.appendChild(checkbox);

    const listOfStudents = student.handedInOnTime
      ? document.querySelector('ul#passedstudents')
      : document.querySelector('ul#failedstudents');

    listOfStudents?.appendChild(container);
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
export function concatenateStrings() {
  const strings = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];

  return strings.join('');
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
export class User {
  constructor(
    public name: string,
    public birthday: Date,
    public email: string,
    public password: string
  ) {}
}

export function createUser(user: User) {
  // Validation

  const ageDiff = Date.now() - user.birthday.getTime();
  const ageDate = new Date(ageDiff);
  const userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  if (userAge > 20) {
    // Logik för att skapa en användare
  } else {
    return 'Du är under 20 år';
  }
}
