Feature: Australian Mobile Number Validation
  As an IVR system
  I want to validate Australian mobile phone numbers
  So that I can ensure users provide valid mobile numbers

  Scenario Outline: Valid Australian mobile numbers
    Given I have a phone number "<phoneNumber>"
    When I validate it as a mobile number
    Then the result should be valid

    Examples:
      | phoneNumber       | description                    |
      | 0412345678        | mobile no formatting           |
      | 0412 345 678      | mobile with spaces             |
      | 04 1234 5678      | mobile with space after prefix |
      | (04) 1234 5678    | mobile with parentheses        |
      | 0423456789        | mobile different prefix        |
      | 0487654321        | mobile high range prefix       |
      | +61 412 345 678   | international with spaces      |
      | +61412345678      | international no spaces        |
      | +61 423 456 789   | international different prefix |
      | +61487654321      | international high range       |

  Scenario Outline: Invalid mobile numbers
    Given I have a phone number "<phoneNumber>"
    When I validate it as a mobile number
    Then the result should be invalid

    Examples:
      | phoneNumber         | reason                          |
      | 0512345678          | invalid prefix (05)             |
      | 0312345678          | landline prefix (03)            |
      | 0212345678          | landline prefix (02)            |
      | 0712345678          | landline prefix (07)            |
      | 0812345678          | landline prefix (08)            |
      | 0412 345 67         | too short                       |
      | 041234567           | missing digits                  |
      | 04123456789         | too many digits                 |
      | +61 212 345 678     | international landline          |
      | +1 555 123 4567     | US number                       |
      | 1300 123 456        | 1300 number                     |
      | 1800 555 666        | 1800 number                     |
      | 13 1234             | 13 number                       |
      |                     | empty string                    |
      | abc                 | non-numeric                     |
      | 04-invalid          | contains letters                |
