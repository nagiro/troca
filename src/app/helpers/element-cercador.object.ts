export class ElementCercador {
  SelOpt: string; // Usuari, Empresa, Oferta
  taula: string;
  camp: string;
  valor: string;
  nom: string;
  options = [];
  tipus = 'I';

  constructor(so = 'U', t = '', c = '', v = '', n = '', a = [], ti = 'I') {
    this.SelOpt = so;
    this.camp = c;
    this.nom = n;
    this.taula = t;
    this.valor = v;
    this.options = a;
    this.tipus = ti;
  }
}
