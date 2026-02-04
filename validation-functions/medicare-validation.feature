Feature: Australian Medicare Number Validation
  As an IVR system
  I want to validate Australian Medicare card numbers
  So that I can ensure users provide valid Medicare numbers with correct Luhn check digits

  Scenario Outline: Valid Medicare numbers
    Given I have a Medicare number "<medicareNumber>"
    When I validate it using the Luhn algorithm
    Then the result should be valid

    Examples:
      | medicareNumber   | description                      |
      | 2950156481       | Valid number no formatting       |
      | 2950 15648 1     | Valid number with spaces         |
      | 2950-15648-1     | Valid number with dashes         |
      | 2950156482       | Valid number issue 2             |
      | 2950156483       | Valid number issue 3             |
      | 2950156484       | Valid number issue 4             |
      | 2950156485       | Valid number issue 5             |
      | 2428143686       | Valid number issue 6             |
      | 2428143687       | Valid number issue 7             |
      | 2428143688       | Valid number issue 8             |
      | 2428143689       | Valid number issue 9             |
      | 3590156451       | First digit 3                    |
      | 4532189882       | First digit 4                    |
      | 5234678923       | First digit 5                    |
      | 6123456744       | First digit 6                    |
      | 2222222201       | Check digit 0                    |

  Scenario Outline: Invalid Medicare numbers
    Given I have a Medicare number "<medicareNumber>"
    When I validate it using the Luhn algorithm
    Then the result should be invalid

    Examples:
      | medicareNumber   | reason                           |
      | 2950156491       | Invalid check digit              |
      | 2950156480       | Issue number 0 (invalid)         |
      | 2950156471       | Wrong check digit                |
      | 295015648        | Too short (9 digits)             |
      | 29501564812      | Too long (11 digits)             |
      | 295015648A       | Contains letters                 |
      | abcdefghij       | Non-numeric                      |
      |                  | Empty string                     |
      | 1234567891       | First digit 1 (must be 2-6)      |
      | 0123456781       | First digit 0 (must be 2-6)      |
      | 7234567891       | First digit 7 (must be 2-6)      |
      | 8234567891       | First digit 8 (must be 2-6)      |
      | 9234567891       | First digit 9 (must be 2-6)      |
      | 2950 1564        | Missing check digit and issue    |
      | 1234-567-89-1    | Invalid first digit with dashes  |
