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
        amount: "20",
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
