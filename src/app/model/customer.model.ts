export class Customer {
    userID?: number;
    userName?: string;
    password?: string;
    role?: string;
    customerCategory?: string;
    phone?: string;
    emailId?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    dob?: string;
  
    // Constructor to initialize values, optional parameters
    constructor(
      userID?: number,
      userName?: string,
      password?: string,
      role?: string,
      customerCategory?: string,
      phone?: string,
      emailId?: string,
      address1?: string,
      address2?: string,
      city?: string,
      state?: string,
      country?: string,
      zipCode?: string,
      dob?: string,
    ) {
      this.userID = userID;
      this.userName = userName;
      this.password = password;
      this.role = role;
      this.customerCategory = customerCategory;
      this.phone = phone;
      this.emailId = emailId;
      this.address1 = address1;
      this.address2 = address2;
      this.city = city;
      this.state = state;
      this.country = country;
      this.zipCode = zipCode;
      this.dob = dob;
    }
  }
  