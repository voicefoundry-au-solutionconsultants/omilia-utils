Feature: Australian Landline Number Validation
  As an IVR system
  I want to validate Australian landline phone numbers
  So that I can ensure users provide valid landline numbers

  Scenario Outline: Valid Australian landline numbers
    Given I have a phone number "<phoneNumber>"
    When I validate it as a landline number
    Then the result should be valid

    Examples:
      | phoneNumber       | description                     |
      | 0212345678        | Sydney no formatting            |
      | (02) 1234 5678    | Sydney with parentheses         |
      | 02 1234 5678      | Sydney with space               |
      | 02-1234-5678      | Sydney with dashes              |
      | 0298765432        | Sydney different number         |
      | 0312345678        | Melbourne no formatting         |
      | (03) 1234 5678    | Melbourne with parentheses      |
      | 03 8765 4321      | Melbourne with space            |
      | 0387654321        | Melbourne different number      |
      | 0712345678        | Brisbane no formatting          |
      | (07) 1234 5678    | Brisbane with parentheses       |
      | 07 5555 6666      | Brisbane with space             |
      | 0812345678        | Adelaide/Perth no formatting    |
      | (08) 1234 5678    | Adelaide/Perth with parentheses |
      | 08 9999 8888      | Adelaide/Perth with space       |
      | +61 2 1234 5678   | International Sydney            |
      | +61212345678      | International Sydney compact    |
      | +61 3 8765 4321   | International Melbourne         |
      | +61387654321      | International Melbourne compact |
      | +61 7 5555 6666   | International Brisbane          |
      | +61 8 9999 8888   | International Adelaide/Perth    |

  Scenario Outline: Invalid landline numbers
    Given I have a phone number "<phoneNumber>"
    When I validate it as a landline number
    Then the result should be invalid

    Examples:
      | phoneNumber         | reason                          |
      | 0412345678          | mobile number (04)              |
      | 0512345678          | invalid area code (05)          |
      | 0612345678          | invalid area code (06)          |
      | 0912345678          | invalid area code (09)          |
      | 0112345678          | invalid area code (01)          |
      | 021234567           | too short                       |
      | 02 1234 567         | missing digits                  |
      | 02123456789         | too many digits                 |
      | +61 412 345 678     | international mobile            |
      | +61 5 1234 5678     | international invalid area code |
      | +1 555 123 4567     | US number                       |
      | 1300 123 456        | 1300 number                     |
      | 1800 555 666        | 1800 number                     |
      | 13 1234             | 13 number                       |
      |                     | empty string                    |
      | abc                 | non-numeric                     |
      | 02-invalid          | contains letters                |
      | (02)                | incomplete number               |
