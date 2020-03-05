# census-graphql-server
type User {
    id: Int
    firstName: String
    lastName: String
    email: String
    password: String
    lastLoggedIn: Date
    isAdmin: Boolean
    active: Boolean
}

type Census {
    id: Int
    name: String
    description: String
    date: Date
}

type Address {
    id: Int
    line1: String
    line2: String
    region: String
    townCity: String
    district: String
    state: String
}

type WorkClass {
    id: Int
    name: String
    description: String
}

type Occupation {
    id: Int
    name: String
    description: String
}

type Education {
    id: Int
    name: String
    description: String
}

type Relationship {
    id: Int
    name: String
    description: String
}

type Caste {
    id: Int
    name: String
    minority: Boolean
    description: String
}

type Sex {
    id: Int
    name: String
    description: String
}

type IncomeClass {
    id: Int
    name: String
    description: String
}

type Individual {
    id: Int
    name: String
    age: Int
    educationYears: Int
    hoursPerWeek: Int
    education: Education
    workClass: WorkClass
    occupation:  Occupation
    relationship: Relationship
    caste: Caste
    sex: Sex
    incomeClass: IncomeClass
}

type Family {
    id: Int
    headName: String
    census: Census
    address: Address
    individuals: [Individual]
}