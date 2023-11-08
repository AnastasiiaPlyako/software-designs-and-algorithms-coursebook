const mockClient = {
    weight: 1,
    fromAddress: 'address 1',
    fromZipCode: '1',
    toAddress: 'address 2',
    toZipCode: '1',
    weight2: 17,
    typesMarks: ['Fragile', 'Do Not Leave']
};

export class Client {
    id?: number;
    weight: number;
    fromAddress: string;
    fromZipCode: string;
    toAddress: string;
    toZipCode: string;
    weight2: number;
    typesMarks: string[];

    constructor() {
        this.initItem(mockClient);
    }

    private initItem (item: Omit<Client, 'initItem'>) {
        this.fromAddress = item.fromAddress;
        this.fromZipCode = item.fromZipCode;
        this.toAddress = item.toAddress;
        this.toZipCode = item.toZipCode;
        this.weight = item.weight;
        this.weight2 = item.weight2;
        this.typesMarks = item.typesMarks;
    }
}


