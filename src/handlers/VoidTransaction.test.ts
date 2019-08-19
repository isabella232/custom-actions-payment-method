import { VoidTransactionHandler } from "./VoidTransaction";
import {
  BraintreeTransaction,
  BraintreeTransactionType,
  BraintreeTransactionStatus
} from "braintree-types";

describe("VoidTransaction", () => {
  describe("success", () => {
    test("promotes transaction to Void", async () => {
      const fakeTransaction: BraintreeTransaction = {
        id: "txn-id",
        amount: "20",
        type: BraintreeTransactionType.SALE,
        status: BraintreeTransactionStatus.AUTHORIZING,
        paymentMethodFields: [
          { name: "Foo", value: "Bar", displayValue: "B**" }
        ]
      };

      expect(await VoidTransactionHandler(fakeTransaction))
        .toMatchInlineSnapshot(`
        Object {
          "transactionStatusEvent": Object {
            "id": "txn-id",
            "status": "VOIDED",
          },
        }
      `);
    });
  });
});
