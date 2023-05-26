import {
  Mint as MintEvent,
  MainWin as MainWinEvent,
  MainLoss as MainLossEvent,
  SecondWin as SecondWinEvent,
  SecondLoss as SecondLossEvent,
  EndTrainingCombat as EndTrainingCombatEvent,
  EndTrainingMana as EndTrainingManaEvent,
} from "../generated/Sk/Sk";
import { Player } from "../generated/schema";

export function handleMint(event: MintEvent): void {
  let player_id = event.params.id.toString();
  let entity = new Player(player_id);
  entity.Player_id = event.params.id;
  entity.owner = event.params.owner;
  entity.name = event.params.name;
  entity.strength = 1;
  entity.mana = 1;
  entity.health = 10;
  entity.Mainwins = 0;
  entity.Mainloss = 0;
  entity.Secondwins = 0;
  entity.Secondloss = 0;
  entity.wins = 0;
  entity.losses = 0;

  entity.save();
}

export function handleMainWin(event: MainWinEvent): void {
  let player_id = event.params._playerId.toString();

  let player = Player.load(player_id);
  if (player) {
    player.Mainwins = player.Mainwins + 1;
    player.wins = player.wins + 1;
    player.save();
  }
}
export function handleMainLoss(event: MainLossEvent): void {
  let player_id = event.params._playerId.toString();

  let player = Player.load(player_id);
  if (player) {
    player.Mainloss = player.Mainloss + 1;
    player.losses = player.losses + 1;
    player.save();
  }
}
export function handleSecondWin(event: SecondWinEvent): void {
  let player_id = event.params._playerId.toString();

  let player = Player.load(player_id);
  if (player) {
    player.Secondwins = player.Secondwins + 1;
    player.wins = player.wins + 1;
    player.save();
  }
}
export function handleSecondLoss(event: SecondLossEvent): void {
  let player_id = event.params._playerId.toString();

  let player = Player.load(player_id);
  if (player) {
    player.Secondloss = player.Secondloss + 1;
    player.losses = player.losses + 1;
    player.save();
  }
}

export function handleEndTrainingCombat(event: EndTrainingCombatEvent): void {
  let player_id = event.params._id.toString();
  let player = Player.load(player_id);

  if (player) {
    player.strength = player.strength + 1;
    player.save();
  }
}

export function handleEndTrainingMana(event: EndTrainingManaEvent): void {
  let player_id = event.params._id.toString();
  let player = Player.load(player_id);

  if (player) {
    player.mana = player.mana + 1;
    player.save();
  }
}
