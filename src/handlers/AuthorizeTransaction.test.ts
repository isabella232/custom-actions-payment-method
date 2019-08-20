import { AuthorizeTransactionHandler } from "./AuthorizeTransaction";
import {
  BraintreeTransaction,
  BraintreeTransactionType,
  BraintreeTransactionStatus
} from "braintree-types";

describe("AuthorizeTransaction", () => {
  describe("success", () => {
    test("promotes transaction to Authorized", async () => {
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
        status: BraintreeTransactionStatus.AUTHORIZING,
        paymentMethodFields: [
          { name: "Foo", value: "Bar", displayValue: "B**" }
        ]
      };

      expect(await AuthorizeTransactionHandler(fakeTransaction))
        .toMatchInlineSnapshot(`
        Object {
          "transactionStatusEvent": Object {
            "id": "txn-id",
            "status": "AUTHORIZED",
          },
        }
      `);
    });
  });
});
