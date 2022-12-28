type History = {
  from: { airport: string; city: string };
  to: { airport: string; city: string };
  departureDate: string;
  returnDate: string | null;
  paxAdult: number;
  paxChild: number;
  paxInfant: number;
  isNoTransit: boolean;
  seatClass: string;
};

export { History };
