import { RefundTransactionHandler } from "./RefundTransaction";
import {
  BraintreeTransaction,
  BraintreeTransactionType,
  BraintreeTransactionStatus
} from "braintree-types";

describe("RefundTransaction", () => {
  let refundableTransaction: BraintreeTransaction;

  beforeEach(() => {
    refundableTransaction = {
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
      status: BraintreeTransactionStatus.SETTLING,
      paymentMethodFields: [{ name: "Foo", value: "Bar", displayValue: "B**" }]
    };
  });

  describe("success", () => {
    test("transitions from SETTLING to SUBMITTED_FOR_SETTLEMENT", async () => {
      expect(await RefundTransactionHandler(refundableTransaction)).toEqual({
        transactionStatusEvent: {
          id: "txn-id",
          settlementTimestamp: expect.any(Date),
          status: "SUBMITTED_FOR_SETTLEMENT"
        }
      });
    });

    test("transitions from SETTLED to SUBMITTED_FOR_SETTLEMENT", async () => {
      const settledTransaction = {
        ...refundableTransaction,
        status: BraintreeTransactionStatus.SETTLED
      };

      expect(await RefundTransactionHandler(settledTransaction)).toEqual({
        transactionStatusEvent: {
          id: "txn-id",
          settlementTimestamp: expect.any(Date),
          status: "SUBMITTED_FOR_SETTLEMENT"
        }
      });
    });
  });
});
