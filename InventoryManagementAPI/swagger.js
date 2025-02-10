import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: "1.0.0",
    title: 'Seyir Füzeleri Sistem Mühendisliği Envanter Uygulaması API',
    description: 'NodeJS - ExpressJS API Docs / Fevzi TEMİZ'
  },
  host: 'localhost:3000',
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    JWT: {
      type: "apiKey",
      name: "Authorization",
      in: "header"
    },
  },
  security: [
    {
      JWT: [],
    }
  ],
  definitions: {
    LoginModel: {
      $userName: "string",
      $password: "string",
    },
    //Brand
    BrandCreateModel: {
      $description: "string",
    },

    BrandUpdateModel: {
      $id: 0,
      $description: "string",
    },
    //Employee
    EmployeeCreateModel: {
      $name: "string",
      $surName: "string",
      $email: "string",
      $gsm: "string",
      $titleId: 0,
      $positionId: 0,
    },

    EmployeeUpdateModel: {
      $id: 0,
      $name: "string",
      $surName: "string",
      $email: "string",
      $gsm: "string",
      $titleId: 0,
      $positionId: 0,
    },
    //Inventory Record
    InventoryRecordCreateModel: {
      $deliveryDate: "2025-01-01",
      $returnDate: "string",
      $description: "string",
      $itemId: 0,
      $deliveredByEmployeeId: 0,
      $deliveredToEmployeeId: 0,
    },

    InventoryRecordUpdateModel: {
      $id: 0,
      $deliveryDate: "2025-01-01",
      $returnDate: "string",
      $description: "string",
      $itemId: 0,
      $deliveredByEmployeeId: 0,
      $deliveredToEmployeeId: 0,
    },
    //Item
    ItemCreateModel: {
      $model: "string",
      $serialNumber: "string",
      $eRegistryNumber: "string",
      $description: "string",
      $typeOfItemId: 0,
      $brandId: 0,
    },

    ItemUpdateModel: {
      $id: 0,
      $model: "string",
      $serialNumber: "string",
      $eRegistryNumber: "string",
      $description: "string",
      $typeOfItemId: 0,
      $brandId: 0,
    },

    //Position
    PositionCreateModel: {
      $description: "string",
    },

    PositionUpdateModel: {
      $id: 0,
      $description: "string",
    },

    //Role
    RoleCreateModel: {
      $description: "string",
    },

    RoleUpdateModel: {
      $id: 0,
      $description: "string",
    },

    //Software
    SoftwareCreateModel: {
      $name: "string",
      $companyEmail: "string",
      $companyPhone: "string",
      $description: "string",
      $lastAgreementDate: "2025-01-01",
      $nextAgreementDate: "2025-01-01",
      $employeeId: 0,
    },

    SoftwareUpdateModel: {
      $id: 0,
      $name: "string",
      $companyEmail: "string",
      $companyPhone: "string",
      $description: "string",
      $lastAgreementDate: "2025-01-01",
      $nextAgreementDate: "2025-01-01",
      $employeeId: 0,
    },

    //Title
    TitleCreateModel: {
      $description: "string",
    },

    TitleUpdateModel: {
      $id: 0,
      $description: "string",
    },

    //TypeOfItem
    TypeOfItemCreateModel: {
      $description: "string",
    },

    TypeOfItemUpdateModel: {
      $id: 0,
      $description: "string",
    },

    //User
    UserCreateModel: {
      $userName: "string",
      $isActive: true,
      $roleId: 0,
      $employeeId: 0,
      $password: "string"
    },

    UserUpdateModel: {
      $id: 0,
      $userName: "string",
      $isActive: true,
      $roleId: 0
    },

    PasswordUpdateModel: {
      $userId: 0,
      $passwordOld: "string",
      $passwordNew: "string"
    },

    //RESPONSES
    LoginResponse: {
      $authToken: "string",
      $refreshToken: "string",
      $expiresIn: "string"
    },
    //Brand Responses
    Brands: {
      $id: 0,
      $description: "string"
    },
    BrandGetAllResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Brands' }],
      $errorDescription: null
    },

    BrandGetByIdResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Brands' }],
      $errorDescription: null
    },
    BrandCreateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Brands' }],
      $errorDescription: null
    },
    BrandUpdateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Brands' }],
      $errorDescription: null
    },
    BrandDeleteResponse: {
      $status: true,
      $data: true,
      $errorDescription: null
    },

    //Position Responses
    Positions: {
      $id: 0,
      $description: "string"
    },
    PositionGetAllResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Positions' }],
      $errorDescription: null
    },

    PositionGetByIdResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Positions' }],
      $errorDescription: null
    },
    PositionCreateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Positions' }],
      $errorDescription: null
    },
    PositionUpdateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Positions' }],
      $errorDescription: null
    },
    PositionDeleteResponse: {
      $status: true,
      $data: true,
      $errorDescription: null
    },

    //Employee Responses
    Employees: {
      $id: 0,
      $name: "string",
      $surName: "string",
      $email: "string",
      $gsm: "string",
      $position: { $ref: '#/definitions/Positions' },
      $title: { $ref: '#/definitions/Titles' }
    },

    EmployeeGetAllResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Employees' }],
      $errorDescription: null
    },

    EmployeeGetByIdResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Employees' }],
      $errorDescription: null
    },
    EmployeeCreateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Employees' }],
      $errorDescription: null
    },
    EmployeeUpdateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Employees' }],
      $errorDescription: null
    },
    EmployeeDeleteResponse: {
      $status: true,
      $data: true,
      $errorDescription: null
    },

    //Title Responses
    Titles: {
      $id: 0,
      $description: "string",
    },
    TitleGetAllResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Titles' }],
      $errorDescription: null
    },

    TitleGetByIdResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Titles' }],
      $errorDescription: null
    },
    TitleCreateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Titles' }],
      $errorDescription: null
    },
    TitleUpdateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Titles' }],
      $errorDescription: null
    },
    TitleDeleteResponse: {
      $status: true,
      $data: true,
      $errorDescription: null
    },

    //Role Responses
    Roles: {
      $id: 0,
      $description: "string",
    },
    RoleGetAllResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Roles' }],
      $errorDescription: null
    },

    RoleGetByIdResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Roles' }],
      $errorDescription: null
    },
    RoleCreateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Roles' }],
      $errorDescription: null
    },
    RoleUpdateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Roles' }],
      $errorDescription: null
    },
    RoleDeleteResponse: {
      $status: true,
      $data: true,
      $errorDescription: null
    },

    //Item Responses
    Items: {
      $id: 0,
      $model: "string",
      $serialNumber: "string",
      $eRegistryNumber: "string",
      $description: "string",
      $brand: { $ref: '#/definitions/Brands' },
      $typeOfItem: { $ref: '#/definitions/TypeOfItems' }
    },
    ItemGetAllResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Items' }],
      $errorDescription: null
    },

    ItemGetByIdResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Items' }],
      $errorDescription: null
    },
    ItemCreateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Items' }],
      $errorDescription: null
    },
    ItemUpdateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Items' }],
      $errorDescription: null
    },
    ItemDeleteResponse: {
      $status: true,
      $data: true,
      $errorDescription: null
    },

    //Type Of Item Responses
    TypeOfItems: {
      $id: 0,
      $description: "string",
    },
    TypeOfItemGetAllResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/TypeOfItems' }],
      $errorDescription: null
    },

    TypeOfItemGetByIdResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/TypeOfItems' }],
      $errorDescription: null
    },
    TypeOfItemCreateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/TypeOfItems' }],
      $errorDescription: null
    },
    TypeOfItemUpdateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/TypeOfItems' }],
      $errorDescription: null
    },
    TypeOfItemDeleteResponse: {
      $status: true,
      $data: true,
      $errorDescription: null
    },

    //Software Responses
    Softwares: {
      $id: 0,
      $name: "string",
      $companyEmail: "string",
      $companyPhone: "string",
      $description: "string",
      $lastAgreementDate: "string",
      $nextAgreementDate: "string",
      $employee: { $ref: '#/definitions/Employees' },
    },
    SoftwareGetAllResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Softwares' }],
      $errorDescription: null
    },

    SoftwareGetByIdResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Softwares' }],
      $errorDescription: null
    },
    SoftwareCreateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Softwares' }],
      $errorDescription: null
    },
    SoftwareUpdateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Softwares' }],
      $errorDescription: null
    },
    SoftwareDeleteResponse: {
      $status: true,
      $data: true,
      $errorDescription: null
    },

    //User Responses
    Users: {
      $id: 0,
      $userName: "string",
      $isActive: true,
      $role: { $ref: '#/definitions/Roles' },
      $employee: { $ref: '#/definitions/Employees' },
    },
    UserGetAllResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Users' }],
      $errorDescription: null
    },

    UserGetByIdResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Users' }],
      $errorDescription: null
    },
    UserCreateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Users' }],
      $errorDescription: null
    },
    UserUpdateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Users' }],
      $errorDescription: null
    },
    PasswordUpdateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/Users' }],
      $errorDescription: null
    },
    UserDeleteResponse: {
      $status: true,
      $data: true,
      $errorDescription: null
    },

    //InventoryRecord Responses
    InventoryRecords: {
      $id: 0,
      $deliveryDate: "string",
      $returnDate: "string",
      $description: "string",
      $deliveredByEmployee: { $ref: '#/definitions/Employees' },
      $item: { $ref: '#/definitions/Items' },
      $deliveredToEmployee: { $ref: '#/definitions/Employees' },
    },

    InventoryRecordGetAllResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/InventoryRecords' }],
      $errorDescription: null
    },

    InventoryRecordGetByIdResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/InventoryRecords' }],
      $errorDescription: null
    },
    InventoryRecordCreateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/InventoryRecords' }],
      $errorDescription: null
    },
    InventoryRecordUpdateResponse: {
      $status: true,
      $data: [{ $ref: '#/definitions/InventoryRecords' }],
      $errorDescription: null
    },
    InventoryRecordDeleteResponse: {
      $status: true,
      $data: true,
      $errorDescription: null
    },
  }
};

const outputFile = './swagger-output.json';
const routes = ['./src/application/routes/*.js'];
swaggerAutogen(outputFile, routes, doc);