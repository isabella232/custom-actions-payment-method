import { CaptureTransactionHandler } from "./CaptureTransaction";
import {
  BraintreeTransaction,
  BraintreeTransactionType,
  BraintreeTransactionStatus
} from "braintree-types";

describe(" CaptureTransaction", () => {
  describe("success", () => {
    test("promotes transaction to  Captured", async () => {
      const fakeTransaction: BraintreeTransaction = {
        id: "txn-id",
        amount: "115.06",
        billing: {
          countryCodeAlpha2: "US",
          firstName: "Kyle",
          lastName: "DeTella",
          locality: "Chicago",
          postalCode: "60654",
          region: "IL",
          streetAddress: "222 W Merchandise Mart Pl"
        },
        customer: {
          email: "user@testing.com",
          phone: "+13122231234",
          firstName: "User",
          lastName: "Someone"
        },
        currencyIsoCode: "USD",
        taxAmount: "0",
        type: BraintreeTransactionType.SALE,
        status: BraintreeTransactionStatus.AUTHORIZED,
        paymentMethodFields: [
          { name: "Foo", value: "Bar", displayValue: "B**" }
        ]
      };

      expect(await CaptureTransactionHandler(fakeTransaction)).toEqual({
        transactionStatusEvent: {
          id: "txn-id",
          settlementTimestamp: expect.any(Date),
          status: "SUBMITTED_FOR_SETTLEMENT"
        }
      });
    });
  });
});
