import { VoidTransactionHandler } from "./VoidTransaction";
import {
  BraintreeTransaction,
  BraintreeTransactionType,
  BraintreeTransactionStatus
} from "braintree-types";

describe("VoidTransaction", () => {
  let voidableTransaction: BraintreeTransaction;

  beforeEach(() => {
    voidableTransaction = {
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
      paymentMethodFields: [{ name: "Foo", value: "Bar", displayValue: "B**" }]
    };
  });

  describe("success", () => {
    test("transitions from AUTHORIZED to VOIDED", async () => {
      expect(await VoidTransactionHandler(voidableTransaction))
        .toMatchInlineSnapshot(`
        Object {
          "transactionStatusEvent": Object {
            "id": "txn-id",
            "status": "VOIDED",
          },
        }
      `);
    });

    test("transitions from SUBMITTED_FOR_SETTLEMENT to VOIDED", async () => {
      const submittedForSettlementTransaction = {
        ...voidableTransaction,
        status: BraintreeTransactionStatus.SUBMITTED_FOR_SETTLEMENT
      };

      expect(await VoidTransactionHandler(submittedForSettlementTransaction))
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
