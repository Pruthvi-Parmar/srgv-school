export type PtaMember = {
  name: string;
  role: string;
  address: string;
};

export const ptaMembers: PtaMember[] = [
  {
    name: "Mr. Sanmukhbhai Lalubhai Patel",
    role: "Member from Trustee Category",
    address: "At & Po. Dhaman, Ta. Navsari, Dist. Navsari",
  },
  {
    name: "Mr. Manoj Bhagvanji Mistry",
    role: "Director",
    address: "11, Sarvoday Nagar, Jamalpore, Navsari",
  },
  {
    name: "Mrs. Deepa Kalpesh Joshi",
    role: "Head of the School",
    address: "23, Shree Shiv Sai Shrusti, Sastri Road, Bardoli, Surat",
  },
  {
    name: "Mr. Manoj Bhagvanji Mistry",
    role: "Nominated Member by the Trust",
    address: "11, Sarvoday Nagar, Jamalpore, Navsari",
  },
  {
    name: "Mr. Girishbhai Vallabhbhai Patel",
    role: "Teacher of the School",
    address: "At & Po. Mahuva, Ta. Mahuva, Dist. Surat",
  },
  {
    name: "Mrs. Jagruti Vipulkumar Mahyavanshi",
    role: "Teacher of the School",
    address: "At & Po. Dungri, Ta. Mahuva, Dist. Surat",
  },
  {
    name: "Mr. Smit Bharatkumar Vashi",
    role: "Parent of the School",
    address: "At & Po. Puni, Ta. Palsana, Dist. Surat",
  },
  {
    name: "Mr. Nimeshbhai Nanubhai Ahir",
    role: "Parent of the School",
    address: "At Amroli, Po. Ranat, Ta. Mahuva, Dist. Surat",
  },
  {
    name: "Mr. Rakeshbhai Rameshbhai Arya",
    role: "Parent of the School",
    address: "At & Po. Pardi Nogama, Ta. Bardoli, Dist. Surat",
  },
  {
    name: "Mrs. Pinki Chintansin Rathod",
    role: "Parent of the School",
    address: "B1, Vrundavan Society, Buhari, Ta. Valod, Dist. Tapi",
  },
  {
    name: "Mr. Nirmalkumar Balvantbhai Mistry",
    role: "Parent of the School",
    address: "At & Po. Sarbhon, Ta. Bardoli, Dist. Surat",
  },
];

export type SmcMember = {
  name: string;
  fatherOrSpouseName: string;
  designation: string;
  occupationWithAddress: string;
  residentialAddress: string;
};

export const smcMembers: SmcMember[] = [
  {
    name: "Mrs. Deepa Kalpesh Joshi",
    fatherOrSpouseName: "Kalpesh Joshi",
    designation: "Secretary",
    occupationWithAddress:
      "Principal, Shree Radhagovind Vidyamandir, Ninat, Ta. Bardoli, Dist. Surat",
    residentialAddress: "23, Shree Shiv Sai Shrusti, Sastri Road, Bardoli, Surat",
  },
  {
    name: "Mr. Keyur Naik",
    fatherOrSpouseName: "Narendrabhai Naik",
    designation: "Parent",
    occupationWithAddress: "Farmer, At. Amroli, Ta. Mahuva, Dist. Surat",
    residentialAddress: "At. Amroli, Post Ranat, Ta. Mahuva, Dist. Surat",
  },
  {
    name: "Mr. Vipulkumar Mahyavanshi",
    fatherOrSpouseName: "Natubhai Mahyavanshi",
    designation: "Parent",
    occupationWithAddress: "Business, At & Po. Dungri, Ta. Mahuva, Dist. Surat",
    residentialAddress: "At & Po. Dungri, Ta. Mahuva, Dist. Surat",
  },
  {
    name: "Mr. Chintansin Rathod",
    fatherOrSpouseName: "Chhatrasinh Rathod",
    designation: "Operation Manager",
    occupationWithAddress:
      "Operation Manager, Shree Radhagovind Vidyamandir, Ninat, Ta. Bardoli, Dist. Surat",
    residentialAddress: "B1, Vrundavan Society, Buhari, Ta. Valod, Dist. Tapi",
  },
  {
    name: "Mr. Babubhai Ahir",
    fatherOrSpouseName: "Mangabhai Ahir",
    designation: "Teacher",
    occupationWithAddress:
      "Teacher, Shree Radhagovind Vidyamandir, Ninat, Ta. Bardoli, Dist. Surat",
    residentialAddress: "At & Post Vadoli, Ta. Bardoli, Dist. Surat",
  },
  {
    name: "Mrs. Pinkibahen Rathod",
    fatherOrSpouseName: "Magansinh Rathod",
    designation: "Teacher from other school",
    occupationWithAddress: "Teacher, N.B. Patel SVS High School, Sarbhon",
    residentialAddress: "B1, Vrundavan Society, Buhari, Ta. Valod, Dist. Tapi",
  },
  {
    name: "Mr. Bharatkumar Vashi",
    fatherOrSpouseName: "Gopaji Vashi",
    designation: "Retired Principal",
    occupationWithAddress: "Retired Principal, At. Pardi Pata, Ta. Palsana, Dist. Surat",
    residentialAddress: "At & Po. Puni, Ta. Palsana, Dist. Surat",
  },
  {
    name: "Mr. Manoj Bhagvanji Mistry",
    fatherOrSpouseName: "Bhagvanji Mistry",
    designation: "Member Recommended by Trust",
    occupationWithAddress:
      "Business, Shree Radhagovind Vidyamandir, Ninat, Ta. Bardoli, Dist. Surat",
    residentialAddress: "11, Sarvoday Nagar, Jamalpore, Navsari",
  },
  {
    name: "Mrs. Vaidehi Bhavsar",
    fatherOrSpouseName: "Sagar Bhavsar",
    designation: "Principal of Nursing College",
    occupationWithAddress:
      "Principal, Shree Radhagovind College of Nursing, Ninat, Ta. Bardoli, Dist. Surat",
    residentialAddress:
      "17, Alaknanda Bungalow, Near Shiv Parvati Society, Tighra Road, Navsari-396445",
  },
];
