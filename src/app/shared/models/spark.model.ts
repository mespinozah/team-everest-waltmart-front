export class Captcha {
  /**
   * Identificador del captcha.
   */
  public id: string;

  /**
   * Identificador de la puerta.
   */
  public door: string;

  /**
   * Listado con los spark para resolver el captcha.
   */
  public sparks: Array<number>;

  /**
   * Identificador de la alternativa del captcha.s
   */
  public alternative: string;
}
