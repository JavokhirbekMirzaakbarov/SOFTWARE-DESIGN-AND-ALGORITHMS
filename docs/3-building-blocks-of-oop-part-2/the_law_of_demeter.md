---
sidebar_position: 5
---

# 4. The Law of Demeter

The purpose of the law of Demeter is lower cohesion. The low cohesion shows that the design is of good quality. In short, the law of Demeter sounds like this:

:::info
Only talk to your immediate neighbors, or in other words: use only one dot.
:::

Some violations of the Law of Demeter are harmless, although others are a sign that the public interface has not been segregated correctly or has not been segregated at all.

Imagine that Trip has a function that checks whether the tire is pumped up or not, ask if the wheel is spinning, and so on. Each line contains a large number of points for accessing internal properties. This may be an indication that **the Law of Demeter** has been violated.

```js title="Listing 4.1"
1. customer.bicycle.wheel.tire();
2. customer.bicycle.wheel.rotate();
3. Object.keys(...).sort(...).join(',');
```

- If wheel changes tire or rotate, depart may have to change. Trip has nothing to do with wheel, yet changes to wheel might force changes in Trip. This unnecessarily raises the cost of change; the code is not reasonable.
- Changing tire or rotate may break something in depart. Because Trip is distant and apparently unrelated, the failure will be completely unexpected. This code is not transparent.
- Trip cannot be reused unless it has access to a customer with a bicycle that has a wheel and a tire. It requires a lot of context and is not easily usable.
- This pattern of messages will be replicated by others, producing more code with similar problems. This style of code, unfortunately, breeds itself. It is not exemplary.

The third line of messages is perfectly reasonable and does not violate the Law of Demeter.

- `Object.keys()` returns an Array.
- `Object.keys().sort()` also returns an Array.
- `Object.keys().sort().join()` returns a String.

It is also quite normal if you are working with a data structure that has a lot of innateness, but you also need to be careful here.

## 4.1 Avoiding violations

One example of how you can avoid unnecessary dependency.

We have a **User** who have **Account** and this account has a plan and User has **discountedPlanPrice** which violate the Law of Demeter.

```ts title="Listing 4.2"
abstract class User {
   private account: Account;

    discountedPlanPrice(coupon: Coupon) {
        return coupon.discount(
            this.account.getPlan().getPrice(),
        );
    };
}

class Account {
    private plan: Plan;

    getPlan() {
        return this.plan;
    };
}
```

One of the common ways to remove such chains is by using delegation. A wrapper method encapsulates or hides knowledge that would otherwise be implemented in the message chain.

```ts title="Listing 4.3"
class Account {
    private plan: Plan;

    discountedPlanPrice(coupon) {
        return coupon.discount(this.plan.getPrice());
    };
}
```

To avoid such problems, you need to think over the application architecture in advance.

:::info
Delegation is an effective technique to avoid Law of Demeter violations, but only for behavior, not for attributes.
:::
