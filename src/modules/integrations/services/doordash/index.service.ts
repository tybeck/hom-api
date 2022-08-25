import {Injectable} from '@nestjs/common';
import {DoorDashClient} from '@doordash/sdk';

@Injectable()
export class DoorDashService {
  client: DoorDashClient = new DoorDashClient({
    signing_secret: process.env.DOORDASH_SIGNING_SECRET,
    developer_id: process.env.DOORDASH_DEVELOPER_ID,
    key_id: process.env.DOORDASH_KEY_ID,
  });

  constructor() {
    //
  }

  async getDeliveryQuote() {
    return this.client.deliveryQuote({
      pickup_address: '601 W MAIN ST PALMYRA, PA 17078',
      pickup_phone_number: '717-641-3251',
      external_delivery_id: '1312312233',
      dropoff_address: '488 FONTANA AVE LEBANON, PA 17042',
      dropoff_phone_number: '717-672-6033',
      order_value: 15000,
    });
  }

  async acceptDeliveryQuote() {

  }
}
