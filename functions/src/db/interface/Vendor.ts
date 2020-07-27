export default interface Vendor {
  profile: {
    name: {
      first: string;
      last: string;
    };
    access: {
      email: string;
    };
  };

  businessEntity: {
    entityName: string;
    location: {
      streetAddr: string;
      city: string;
      state: string;
      zipCode: number;
    };
  };
}
