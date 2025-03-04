"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/common/utils/envConfig.ts
var import_dotenv = __toESM(require("dotenv"));
var import_envalid = require("envalid");
import_dotenv.default.config();
var env = (0, import_envalid.cleanEnv)(process.env, {
  NODE_ENV: (0, import_envalid.str)({ devDefault: (0, import_envalid.testOnly)("test"), choices: ["development", "production", "test"] }),
  HOST: (0, import_envalid.host)({ devDefault: (0, import_envalid.testOnly)("localhost") }),
  PORT: (0, import_envalid.port)({ devDefault: (0, import_envalid.testOnly)(3e3) }),
  CORS_ORIGIN: (0, import_envalid.str)({ devDefault: (0, import_envalid.testOnly)("http://localhost:3000") }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: (0, import_envalid.num)({ devDefault: (0, import_envalid.testOnly)(1e3) }),
  COMMON_RATE_LIMIT_WINDOW_MS: (0, import_envalid.num)({ devDefault: (0, import_envalid.testOnly)(1e3) })
});

// src/server.ts
var import_cors = __toESM(require("cors"));
var import_express2 = __toESM(require("express"));
var import_helmet = __toESM(require("helmet"));
var import_pino = require("pino");

// src/common/middleware/errorHandler.ts
var import_http_status_codes = require("http-status-codes");
var unexpectedRequest = (_req, res) => {
  res.sendStatus(import_http_status_codes.StatusCodes.NOT_FOUND);
};
var addErrorToRequestLog = (err, _req, res, next) => {
  res.locals.err = err;
  next(err);
};
var errorHandler_default = () => [unexpectedRequest, addErrorToRequestLog];

// src/common/middleware/rateLimiter.ts
var import_express_rate_limit = require("express-rate-limit");
var rateLimiter = (0, import_express_rate_limit.rateLimit)({
  legacyHeaders: true,
  limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  windowMs: 15 * 60 * env.COMMON_RATE_LIMIT_WINDOW_MS,
  keyGenerator: (req) => req.ip
});
var rateLimiter_default = rateLimiter;

// src/common/middleware/requestLogger.ts
var import_node_crypto = require("crypto");
var import_http_status_codes2 = require("http-status-codes");
var import_pino_http = require("pino-http");
var requestLogger = (options) => {
  const pinoOptions = {
    enabled: env.isProduction,
    customProps,
    redact: [],
    genReqId,
    customLogLevel,
    customSuccessMessage,
    customReceivedMessage: (req) => `request received: ${req.method}`,
    customErrorMessage: (_req, res) => `request errored with status code: ${res.statusCode}`,
    customAttributeKeys,
    ...options
  };
  return [responseBodyMiddleware, (0, import_pino_http.pinoHttp)(pinoOptions)];
};
var customAttributeKeys = {
  req: "request",
  res: "response",
  err: "error",
  responseTime: "timeTaken"
};
var customProps = (req, res) => ({
  request: req,
  response: res,
  error: res.locals.err,
  responseBody: res.locals.responseBody
});
var responseBodyMiddleware = (_req, res, next) => {
  const isNotProduction = !env.isProduction;
  if (isNotProduction) {
    const originalSend = res.send;
    res.send = (content) => {
      res.locals.responseBody = content;
      res.send = originalSend;
      return originalSend.call(res, content);
    };
  }
  next();
};
var customLogLevel = (_req, res, err) => {
  if (err || res.statusCode >= import_http_status_codes2.StatusCodes.INTERNAL_SERVER_ERROR) return "error" /* Error */;
  if (res.statusCode >= import_http_status_codes2.StatusCodes.BAD_REQUEST) return "warn" /* Warn */;
  if (res.statusCode >= import_http_status_codes2.StatusCodes.MULTIPLE_CHOICES) return "silent" /* Silent */;
  return "info" /* Info */;
};
var customSuccessMessage = (req, res) => {
  if (res.statusCode === import_http_status_codes2.StatusCodes.NOT_FOUND) return (0, import_http_status_codes2.getReasonPhrase)(import_http_status_codes2.StatusCodes.NOT_FOUND);
  return `${req.method} completed`;
};
var genReqId = (req, res) => {
  const existingID = req.id ?? req.headers["x-request-id"];
  if (existingID) return existingID;
  const id = (0, import_node_crypto.randomUUID)();
  res.setHeader("X-Request-Id", id);
  return id;
};
var requestLogger_default = requestLogger();

// src/modules/credit-card/credit-card.routes.ts
var import_express = __toESM(require("express"));

// src/modules/credit-card/credit-card.controller.ts
var import_http_status_codes4 = require("http-status-codes");

// src/modules/credit-card/creditCard.schema.ts
var import_joi = __toESM(require("joi"));

// src/common/utils/dateValidator.ts
var isValidExpiryDate = (expiryDate) => {
  const [month, year] = expiryDate.split("/");
  const monthNumber = parseInt(month, 10);
  if (monthNumber < 1 || monthNumber > 12) {
    return false;
  }
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear() % 100;
  const yearNumber = parseInt(year, 10);
  if (yearNumber < currentYear) {
    return false;
  }
  return true;
};

// src/modules/credit-card/creditCard.schema.ts
var creditCardSchema = import_joi.default.object({
  cardNumber: import_joi.default.string().pattern(/^\d{16}$/).required().messages({
    "string.pattern.base": "Card number must be 16 digits",
    "any.required": "Card number is required"
  }),
  cardHolder: import_joi.default.string().min(3).max(50).required().messages({
    "string.min": "Card holder name must be at least 3 characters",
    "string.max": "Card holder name must be at most 50 characters",
    "any.required": "Card holder name is required"
  }),
  expiryDate: import_joi.default.string().pattern(/^(0[1-9]|1[0-2])\/\d{2}$/).custom((value, helpers) => {
    if (!isValidExpiryDate(value)) {
      return helpers.error("any.invalid", {
        message: "Expiry date is invalid or in the past"
      });
    }
    return value;
  }).required().messages({
    "string.pattern.base": "Expiry date must be in the format MM/YY",
    "any.required": "Expiry date is required",
    "any.invalid": "Expiry date is invalid or in the past"
  }),
  cvv: import_joi.default.string().pattern(/^\d{3,4}$/).required().messages({
    "string.pattern.base": "CVV must be 3 or 4 digits",
    "any.required": "CVV is required"
  })
});

// src/common/utils/isValidCreditCard.ts
var isValidCreditCard = (cardNumber) => {
  if (cardNumber === "") return false;
  const digits = cardNumber.replace(/\D/g, "").split("").map(Number).reverse();
  const sum = digits.reduce((acc, digit, idx) => {
    if (idx % 2 === 1) {
      const doubled = digit * 2;
      return acc + (doubled > 9 ? doubled - 9 : doubled);
    }
    return acc + digit;
  }, 0);
  return sum % 10 === 0;
};

// src/common/utils/handleError.ts
var import_http_status_codes3 = require("http-status-codes");
function handleError(res, error) {
  if (error instanceof Error) {
    res.status(import_http_status_codes3.StatusCodes.BAD_REQUEST).json({ error: error.message });
  } else {
    res.status(import_http_status_codes3.StatusCodes.BAD_REQUEST).json({ error: "An unexpected error occurred." });
  }
}

// src/modules/credit-card/credit-card.controller.ts
var CreditCardController = class {
  async validateCard(req, res) {
    try {
      const { error, value } = creditCardSchema.validate(req.body);
      if (error) {
        return res.status(import_http_status_codes4.StatusCodes.BAD_REQUEST).json({ error: error.details[0].message });
      }
      const { cardNumber, cardHolder, expiryDate, cvv } = value;
      const isValid = isValidCreditCard(cardNumber);
      if (!isValid) {
        return res.status(import_http_status_codes4.StatusCodes.BAD_REQUEST).json({
          error: "Invalid card number"
        });
      }
      res.json({
        valid: isValid,
        cardNumber,
        cardHolder,
        expiryDate,
        cvv
      });
    } catch (error) {
      handleError(res, error);
    }
  }
};
var credit_card_controller_default = new CreditCardController();

// src/modules/credit-card/credit-card.routes.ts
var router = import_express.default.Router();
router.post("/validate-card", credit_card_controller_default.validateCard);
var credit_card_routes_default = router;

// src/server.ts
var logger = (0, import_pino.pino)({ name: "server start" });
var app = (0, import_express2.default)();
app.set("trust proxy", true);
app.use(import_express2.default.json());
app.use(import_express2.default.urlencoded({ extended: true }));
app.use((0, import_cors.default)({ origin: env.CORS_ORIGIN, credentials: true }));
app.use((0, import_helmet.default)());
app.use(rateLimiter_default);
app.use(requestLogger_default);
app.use("/api/credit-card", credit_card_routes_default);
app.use(errorHandler_default());

// src/index.ts
var server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});
var onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 1e4).unref();
};
process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
//# sourceMappingURL=index.js.map