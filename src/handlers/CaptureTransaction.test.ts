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
        amount: "20",
        type: BraintreeTransactionType.SALE,
        status: BraintreeTransactionStatus.AUTHORIZING,
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
