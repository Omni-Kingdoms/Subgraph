import {
  Mint as MintEvent,
  CreateBasicMonster as CreateBasicMonsterEvent,
  CreateMagicMonster as CreateMagicMonsterEvent,
  FightBasicMonster as FightBasicMonsterEvent,
  FightMagicMonster as FightMagicMonsterEvent,
  LevelUp as LevelUpEvent,
  CreateBasicPotion as CreateBasicPotionEvent,
  PurchaseBasicPotion as PurchaseBasicPotionEvent,
  ConsumeBasicPotion as ConsumeBasicPotionEvent,
  BasicEquipmentSchemaCreated as BasicEquipmentSchemaCreatedEvent,
  PurchaseBasicEquipment as PurchaseBasicEquipmentEvent,
  CreateBasicArena as CreateBasicArenaEvent,
  BasicArenaLoss as BasicArenaLossEvent,
  BasicArenaWin as BasicArenaWinEvent,
  ItemEquiped as ItemEquipedEvent,
  ItemUnequiped as ItemUnequipedEvent,
  EnterBasicArena as EnterBasicArenaEvent,
  LeaveBasicArena as LeaveBasicArenaEvent,
  BeginTrainingBasicHealth as BeginTrainingBasicHealthEvent,
  EndTrainingBasicHealth as EndTrainingBasicHealthEvent,
  BeginTrainingMana as BeginTrainingManaEvent,
  EndTrainingMana as EndTrainingManaEvent,
  BeginQuesting as BeginQuestingEvent,
  EndQuesting as EndQuestingEvent,
  Transfer as TransferEvent,
  CreatePlayerListing as CreatePlayerListingEvent,
  DelistPlayer as DelistPlayerEvent,
  PurchasePlayerListing as PurchasePlayerListingEvent,
  CreateBasicCraft as CreateBasicCraftEvent,
  BasicCraftEvent,
  LevelUpPatch as LevelUpPatchEvent,
  OKP,
  CreateAdvancedCraft as CreateAdvancedCraftEvent,
  AdvancedCraftEvent,
  TreasureSchemaCreation as TreasureSchemaCreationEvent,
  MintTreasure as MintTreasureEvent,
} from "../generated/OKP/OKP";
import {
  User,
  Player,
  Monster,
  BasicPotion,
  BasicPotionBalance,
  BasicCraft,
  MagicMonster,
  Equipment,
  EquipmentInStore,
  EquipCount,
  Arena,
  ArenaResults,
  Sale,
  Listing,
  AdvancedCraft,
  Treasure,
  TreasureBalance,
} from "../generated/schema";
import { store, BigInt, bigInt } from "@graphprotocol/graph-ts";

export function handleMint(event: MintEvent): void {
  let player_id = event.params.id.toString();
  let entity = new Player(player_id);

  let user = new User(event.params.owner.toHexString());
  user.gold = 0;
  user.gem = 0;
  user.save();

  let class_id = event.params._class.toString();
  if (class_id == "0") {
    entity.classes = "Warrior";
    entity.maxHealth = 12;
    entity.currentHealth = 12;
    entity.maxMana = 10;
    entity.currentMana = 10;
    entity.strength = 11;
    entity.magic = 10;
    entity.agility = 10;
    entity.defense = 10;
  }
  if (class_id == "1") {
    entity.classes = "Assassin";

    entity.maxHealth = 11;
    entity.currentHealth = 11;
    entity.maxMana = 10;
    entity.currentMana = 10;
    entity.strength = 11;
    entity.magic = 10;
    entity.agility = 12;
    entity.defense = 10;
  }
  if (class_id == "2") {
    entity.classes = "Mage";

    entity.maxHealth = 11;
    entity.currentHealth = 11;
    entity.maxMana = 12;
    entity.currentMana = 12;
    entity.strength = 10;
    entity.magic = 12;
    entity.agility = 10;
    entity.defense = 10;
  }
  if (class_id == "3") {
    entity.classes = "Paladin";

    entity.maxHealth = 13;
    entity.currentHealth = 13;
    entity.maxMana = 13;
    entity.currentMana = 13;
    entity.strength = 13;
    entity.magic = 13;
    entity.agility = 13;
    entity.defense = 13;
  }
  entity.Player_id = event.params.id;
  entity.user = event.params.owner.toHexString();
  entity.name = event.params.name;
  entity.stats = "idle";
  entity.exp = 0;
  entity.totalLosses = 0;
  entity.totalWins = 0;
  entity.level = 1;

  entity.save();
}

export function handleCreateBasicMonster(event: CreateBasicMonsterEvent): void {
  let entity = new Monster(event.params._monsterId.toString());
  entity.cooldown = event.params._basicMonster.cooldown.toI32();
  entity.xpReward = event.params._basicMonster.xpReward.toI32();
  entity.damage = event.params._basicMonster.damage.toI32();
  entity.hp = event.params._basicMonster.hp.toI32();
  entity.name = event.params._basicMonster.name;
  entity.uri = event.params._basicMonster.uri;
  entity.save();
}
export function handleCreateMagicMonster(event: CreateMagicMonsterEvent): void {
  let entity = new MagicMonster(event.params._monsterId.toString());
  entity.cooldown = event.params._magicMonster.cooldown.toI32();
  entity.xpReward = event.params._magicMonster.xpReward.toI32();
  entity.damage = event.params._magicMonster.damage.toI32();
  entity.hp = event.params._magicMonster.hp.toI32();
  entity.name = event.params._magicMonster.name;
  entity.uri = event.params._magicMonster.uri;
  entity.cost = event.params._magicMonster.cost.toI32();
  entity.save();
}

export function handleBeginTrainingBasicHealth(
  event: BeginTrainingBasicHealthEvent
): void {
  let player_id = event.params._id.toString();
  let player = Player.load(player_id);

  if (player) {
    player.stats = "train";
    player.save();
  }
}
export function handleEndTrainingBasicHealth(
  event: EndTrainingBasicHealthEvent
): void {
  let player_id = event.params._id.toString();
  let player = Player.load(player_id);

  if (player) {
    player.currentHealth++;
    player.stats = "idle";
    player.save();
  }
}
export function handleBeginTrainingMana(event: BeginTrainingManaEvent): void {
  let player_id = event.params._id.toString();
  let player = Player.load(player_id);

  if (player) {
    player.stats = "train";
    player.save();
  }
}
export function handleEndTrainingMana(event: EndTrainingManaEvent): void {
  let player_id = event.params._id.toString();
  let player = Player.load(player_id);

  if (player) {
    player.currentMana++;
    player.stats = "idle";
    player.save();
  }
}

export function handleFightBasicMonster(event: FightBasicMonsterEvent): void {
  let player_id = event.params._playerId.toString();
  let player = Player.load(player_id);
  let monster_id = event.params._monsterId.toString();
  let monster = Monster.load(monster_id);

  let damage: i32;

  if (player && monster) {
    if (player.defense >= monster.damage) {
      damage = 1;
    } else {
      damage = monster.damage - player.defense;
    }
    player.currentHealth = player.currentHealth - damage;
    player.exp = player.exp + monster.xpReward;
    player.save();
  }
}
export function handleFightMagicMonster(event: FightMagicMonsterEvent): void {
  let player_id = event.params._playerId.toString();
  let player = Player.load(player_id);
  let monster_id = event.params._monsterId.toString();
  let monster = MagicMonster.load(monster_id);

  let damage: i32;

  if (player && monster) {
    if (player.defense >= monster.damage) {
      damage = 1;
    } else {
      damage = monster.damage - player.defense;
    }
    player.currentHealth = player.currentHealth - damage;
    player.currentMana = player.currentMana - monster.cost;
    player.exp = player.exp + monster.xpReward;

    player.save();
  }
}

export function handleLevelUp(event: LevelUpEvent): void {
  let player_id = event.params._playerId.toString();
  let player = Player.load(player_id);

  let stat = event.params._stat.toString();

  if (player) {
    if (stat == "0") {
      player.strength++;
    }
    if (stat == "1") {
      player.maxHealth++;
    }
    if (stat == "2") {
      player.agility++;
    }
    if (stat == "3") {
      player.magic++;
    }
    if (stat == "4") {
      player.defense++;
    }
    if (stat == "6") {
      player.maxMana++;
      player.currentMana = player.maxMana;
    }
    player.currentHealth = player.maxHealth;
    player.exp = player.exp - player.level * 10;

    player.level++;
    player.save();
  }
}

export function handleCreateBasicPotion(event: CreateBasicPotionEvent): void {
  let potion_id = event.params._basicPotionSchemaId.toString();
  let entity = new BasicPotion(potion_id);
  entity.name = event.params.potionSchema.name.toString();
  entity.uri = event.params.potionSchema.uri.toString();
  entity.cost = event.params.potionSchema.cost.toI32();
  entity.value = event.params.potionSchema.value.toI32();
  if (event.params.potionSchema.isHealth) {
    entity.type = "health";
  } else {
    entity.type = "mana";
  }
  entity.save();
}

export function handlePurchaseBasicPotion(
  event: PurchaseBasicPotionEvent
): void {
  let potion_id = event.params._basicPotionSchemaId.toString();
  let potion = BasicPotion.load(potion_id);
  let player_id = event.params._playerId.toString();
  let player = Player.load(player_id);
  let tokenBalanceId = player_id.concat("-").concat(potion_id);
  let potionBalance = BasicPotionBalance.load(tokenBalanceId);

  if (potion && player) {
    if (potionBalance === null) {
      potionBalance = new BasicPotionBalance(tokenBalanceId);
      potionBalance.potion = potion.id;
      potionBalance.player = player.id;
      potionBalance.balance = potionBalance.balance + 1;
      potionBalance.save();
    } else {
      potionBalance.balance = potionBalance.balance + 1;
      potionBalance.save();
    }
  }
}

export function handleMintTreasure(event: MintTreasureEvent): void {
  let treasure_id = event.params._treasureSchemaId.basicTreasureId.toString();
  let treasure = Treasure.load(treasure_id);
  let player_id = event.params._playerId.toString();
  let player = Player.load(player_id);
  let treasureBalanceId = player_id.concat("-").concat(treasure_id);
  let treasureBalance = TreasureBalance.load(treasureBalanceId);

  if (treasure && player) {
    if (treasureBalance === null) {
      treasureBalance = new TreasureBalance(treasureBalanceId);
      treasureBalance.treasure = treasure.id;
      treasureBalance.player = player.id;
      treasureBalance.balance = treasureBalance.balance + 1;
      treasureBalance.save();
    } else {
      treasureBalance.balance = treasureBalance.balance + 1;
      treasureBalance.save();
    }
  }
}

export function handleConsumeBasicPotion(event: ConsumeBasicPotionEvent): void {
  let potion_id = event.params._basicPotionSchemaId.toString();
  let potion = BasicPotion.load(potion_id);
  let player_id = event.params._playerId.toString();
  let player = Player.load(player_id);
  let tokenBalanceId = player_id.concat("-").concat(potion_id);
  let potionBalance = BasicPotionBalance.load(tokenBalanceId);

  if (potion && player) {
    if (potionBalance) {
      if (player.currentHealth + potion.value <= player.maxHealth) {
        player.currentHealth = player.currentHealth + potion.value;
      } else {
        player.currentHealth = player.maxHealth;
      }
      potionBalance.balance = potionBalance.balance - 1;
      if (potionBalance.balance == 0) {
        store.remove("BasicPotionBalance", tokenBalanceId);
      } else {
        potionBalance.save();
      }
      player.save();
      potion.save();
    }
  }
}

export function handleBasicEquipmentSchemaCreated(
  event: BasicEquipmentSchemaCreatedEvent
): void {
  let entity = new EquipmentInStore(
    event.params._basicEquipmentSchemaId.toString()
  );
  let slot = event.params._basicEQuipmentSchema.slot.toString();
  if (slot == "0") {
    entity.slot = "head";
  }
  if (slot == "1") {
    entity.slot = "body";
  }
  if (slot == "2") {
    entity.slot = "lefthand";
  }
  if (slot == "3") {
    entity.slot = "righthand";
  }
  if (slot == "4") {
    entity.slot = "pants";
  }
  if (slot == "5") {
    entity.slot = "feet";
  }
  if (slot == "6") {
    entity.slot = "neck";
  }
  let stat = event.params._basicEQuipmentSchema.stat.toString();
  if (stat == "0") {
    entity.stat = "strength";
  }
  if (stat == "1") {
    entity.stat = "health";
  }
  if (stat == "2") {
    entity.stat = "agility";
  }
  if (stat == "3") {
    entity.stat = "magic";
  }
  if (stat == "4") {
    entity.stat = "defense";
  }
  if (stat == "5") {
    entity.stat = "mana";
  }
  if (stat == "6") {
    entity.stat = "luck";
  }
  entity.value = event.params._basicEQuipmentSchema.value.toI32();
  entity.cost = event.params._basicEQuipmentSchema.cost.toI32();
  entity.name = event.params._basicEQuipmentSchema.name.toString();
  entity.uri = event.params._basicEQuipmentSchema.uri.toString();
  entity.save();
}
export function handleTreasureSchemaCreation(
  event: TreasureSchemaCreationEvent
): void {
  let entity = new Treasure(
    event.params._treasureSchemaId.basicTreasureId.toString()
  );
  entity.rank = event.params._treasureSchemaId.rank.toI32();
  entity.name = event.params._treasureSchemaId.name.toString();
  entity.uri = event.params._treasureSchemaId.uri.toString();
  entity.save();
}

export function handleItemEquiped(event: ItemEquipedEvent): void {
  let player_id = event.params._playerId.toString();
  let player = Player.load(player_id);
  let equipment_id = event.params._equipmentId.toString();
  let equipment = Equipment.load(equipment_id);

  if (player && equipment) {
    equipment.isEquipped = true;
    if (equipment.stat == "strength") {
      player.strength = player.strength + equipment.value;
    }
    if (equipment.stat == "health") {
      player.maxHealth = player.maxHealth + equipment.value;
      player.currentHealth = player.currentHealth + equipment.value;
    }
    if (equipment.stat == "agility") {
      player.agility = player.agility + equipment.value;
    }
    if (equipment.stat == "magic") {
      player.magic = player.magic + equipment.value;
    }
    if (equipment.stat == "defense") {
      player.defense = player.defense + equipment.value;
    }
    if (equipment.stat == "mana") {
      player.maxMana = player.maxMana + equipment.value;
      player.currentMana = player.currentMana + equipment.value;
    }
    equipment.save();
    player.save();
  }
}
export function handleItemUnequiped(event: ItemUnequipedEvent): void {
  let player_id = event.params._playerId.toString();
  let player = Player.load(player_id);
  let equipment_id = event.params._equipmentId.toString();
  let equipment = Equipment.load(equipment_id);

  if (player && equipment) {
    equipment.isEquipped = false;
    if (equipment.stat == "0") {
      player.strength = player.strength - equipment.value;
    }
    if (equipment.stat == "1") {
      player.maxHealth = player.maxHealth - equipment.value;
      if (player.currentHealth <= equipment.value) {
        player.currentHealth = 0;
      } else {
        player.currentHealth = player.currentHealth - equipment.value;
      }
    }
    if (equipment.stat == "2") {
      player.agility = player.agility - equipment.value;
    }
    if (equipment.stat == "3") {
      player.magic = player.magic - equipment.value;
    }
    if (equipment.stat == "4") {
      player.defense = player.defense - equipment.value;
    }
    if (equipment.stat == "5") {
      player.maxMana = player.maxMana - equipment.value;
      if (player.currentMana <= equipment.value) {
        player.currentMana = 0;
      } else {
        player.currentMana = player.currentMana - equipment.value;
      }
    }
    equipment.save();
    player.save();
  }
}

export function handlePurchaseBasicEquipment(
  event: PurchaseBasicEquipmentEvent
): void {
  let equipment_id = event.params._equipmentSchemaId.toString();
  let equipmentInStore = EquipmentInStore.load(equipment_id);
  let player_id = event.params._playerId.toString();
  let player = Player.load(player_id);
  let count = EquipCount.load("0");
  if (count) {
    count.count = count.count + 1;
    count.save();
  } else {
    count = new EquipCount("0");
    count.count = 1;
    count.save();
  }

  if (player && equipmentInStore) {
    let entity = new Equipment(count.count.toString());
    entity.slot = equipmentInStore.slot;
    entity.rank = 1;
    entity.value = equipmentInStore.value;
    entity.stat = equipmentInStore.stat;
    entity.player = player.id;
    entity.name = equipmentInStore.name;
    entity.uri = equipmentInStore.uri;
    entity.isEquipped = false;
    entity.save();
  }
}

export function handleCreateBasicArena(event: CreateBasicArenaEvent): void {
  let entity = new Arena(event.params._basicArenaId.toString());
  entity.name = event.params._basicArena.name.toString();
  entity.uri = event.params._basicArena.url.toString();
  entity.cost = event.params._basicArena.cost.toI32();
  entity.cooldown = event.params._basicArena.cooldown.toI32();
  entity.save();
}

export function handleBasicArenaWin(event: BasicArenaWinEvent): void {
  let arena_id = event.params._basicArenaId.toString();
  let arena = Arena.load(arena_id);
  let player_id = event.params._playerId.toString();
  let player = Player.load(player_id);
  let arenaResultsId = player_id.concat("-").concat(arena_id);
  let arenaResults = ArenaResults.load(arenaResultsId);

  if (arena && player) {
    if (arenaResults === null) {
      arenaResults = new ArenaResults(arenaResultsId);
      arenaResults.player = player.id;
      arenaResults.arena = arena.id;
      arenaResults.wins = 1;
      arenaResults.losses = 0;
      player.totalWins = player.totalWins + 1;
    } else {
      arenaResults.wins = arenaResults.wins + 1;
      player.totalWins = player.totalWins + 1;
    }
    player.save();
    arenaResults.save();
  }
}

export function handleBasicArenaLoss(event: BasicArenaLossEvent): void {
  let arena_id = event.params._basicArenaId.toString();
  let arena = Arena.load(arena_id);
  let player_id = event.params._playerId.toString();
  let player = Player.load(player_id);
  let arenaResultsId = player_id.concat("-").concat(arena_id);
  let arenaResults = ArenaResults.load(arenaResultsId);

  if (arena && player) {
    if (arenaResults === null) {
      arenaResults = new ArenaResults(arenaResultsId);
      arenaResults.player = player.id;
      arenaResults.arena = arena.id;
      arenaResults.wins = 0;
      arenaResults.losses = 1;
      player.totalLosses = player.totalLosses + 1;
    } else {
      arenaResults.losses = arenaResults.losses + 1;
      player.totalLosses = player.totalLosses + 1;
    }
    player.save();
    arenaResults.save();
  }
}

export function handleEnterBasicArena(event: EnterBasicArenaEvent): void {
  let arena_id = event.params._basicArenaId.toString();
  let arena = Arena.load(arena_id);
  let player_id = event.params._playerId.toString();
  let player = Player.load(player_id);

  if (arena && player) {
    player.stats = "arena";
    arena.host = player.id;
    player.save();
    arena.save();
  }
}

export function handleLeaveBasicArena(event: LeaveBasicArenaEvent): void {
  let arena_id = event.params._basicArenaId.toString();
  let arena = Arena.load(arena_id);
  let player_id = event.params._playerId.toString();
  let player = Player.load(player_id);

  if (arena && player) {
    player.stats = "idle";
    arena.host = null;
    player.save();
    arena.save();
  }
}

export function handleBeginQuesting(event: BeginQuestingEvent): void {
  let player_id = event.params._id.toString();
  let player = Player.load(player_id);

  if (player) {
    player.stats = "quest";
    player.save();
  }
}
export function handleEndQuesting(event: EndQuestingEvent): void {
  let player_id = event.params._id.toString();
  let player = Player.load(player_id);

  if (player) {
    player.stats = "idle";
    player.save();
  }
}

export function handleTransfer(event: TransferEvent): void {
  let user_to = User.load(event.params.to.toHexString());
  let player = Player.load(event.params.tokenId.toString());

  if (user_to === null) {
    user_to = new User(event.params.to.toHexString());
    user_to.gold = 0;
    user_to.gem = 0;
    user_to.save();
  }
  if (player) {
    player.user = user_to.id;
    user_to.save();
    player.save();
  }
}

export function handleCreatePlayerListing(
  event: CreatePlayerListingEvent
): void {
  let player = Player.load(event.params._playerId.toString());
  let listing = new Listing(event.params._playerId.toString());

  if (player) {
    player.stats = "listing";
    listing.price = event.params._price;
    listing.seller = event.transaction.from.toHexString();
    listing.timestamp = event.block.timestamp;
    listing.player = player.id;
    player.save();
    listing.save();
  }
}

export function handleDelistPlayer(event: DelistPlayerEvent): void {
  let player = Player.load(event.params._playerId.toString());
  let listing = Listing.load(event.params._playerId.toString());

  if (player && listing) {
    player.stats = "idle";
    player.save();
    store.remove("Listing", player.id);
  }
}

export function handlePurchasePlayerListing(
  event: PurchasePlayerListingEvent
): void {
  let sale = new Sale(event.transaction.hash.toHexString());
  let listing = Listing.load(event.params._id.toString());
  let player = Player.load(event.params._id.toString());

  if (player && listing) {
    player.stats = "idle";
    sale.buyer = event.params._to.toHexString();
    sale.price = listing.price;
    sale.seller = listing.seller;
    sale.player = player.id;
    sale.timestamp = event.block.timestamp;
    sale.txHash = event.transaction.hash.toHexString();
    player.save();
    sale.save();
    store.remove("Listing", player.id);
  }
}

export function handleCreateBasicCraft(event: CreateBasicCraftEvent): void {
  let craft = new BasicCraft(event.params.id.toString());
  let slot = event.params._basicCraft.slot.toString();
  if (slot == "0") {
    craft.slot = "head";
  }
  if (slot == "1") {
    craft.slot = "body";
  }
  if (slot == "2") {
    craft.slot = "lefthand";
  }
  if (slot == "3") {
    craft.slot = "righthand";
  }
  if (slot == "4") {
    craft.slot = "pants";
  }
  if (slot == "5") {
    craft.slot = "feet";
  }
  if (slot == "6") {
    craft.slot = "neck";
  }
  craft.cost = event.params._basicCraft.cost.toI32();
  craft.value = event.params._basicCraft.value.toI32();
  craft.oldName = event.params._basicCraft.oldName.toString();
  craft.newName = event.params._basicCraft.newName.toString();
  craft.uri = event.params._basicCraft.uri.toString();
  craft.save();
}

export function handleCreateAdvancedCraft(
  event: CreateAdvancedCraftEvent
): void {
  let craft = new AdvancedCraft(event.params.id.toString());
  let slot = event.params._advancedCraft.slot.toString();
  if (slot == "0") {
    craft.slot = "head";
  }
  if (slot == "1") {
    craft.slot = "body";
  }
  if (slot == "2") {
    craft.slot = "lefthand";
  }
  if (slot == "3") {
    craft.slot = "righthand";
  }
  if (slot == "4") {
    craft.slot = "pants";
  }
  if (slot == "5") {
    craft.slot = "feet";
  }
  if (slot == "6") {
    craft.slot = "neck";
  }
  let stat = event.params._advancedCraft.stat.toString();
  if (stat == "0") {
    craft.stat = "strength";
  }
  if (stat == "1") {
    craft.stat = "health";
  }
  if (stat == "2") {
    craft.stat = "agility";
  }
  if (stat == "3") {
    craft.stat = "magic";
  }
  if (stat == "4") {
    craft.stat = "defense";
  }
  if (stat == "5") {
    craft.stat = "mana";
  }
  if (stat == "6") {
    craft.stat = "luck";
  }
  craft.treasure = event.params._advancedCraft.treasureSchemaId.toString();
  craft.value = event.params._advancedCraft.value.toI32();
  craft.oldName = event.params._advancedCraft.oldName.toString();
  craft.newName = event.params._advancedCraft.newName.toString();
  craft.uri = event.params._advancedCraft.uri.toString();
  craft.save();
}

export function handleAdvancedCraftEvent(event: AdvancedCraftEvent): void {
  let craft = AdvancedCraft.load(event.params._advancedCraftId.toString());
  let equipment = Equipment.load(event.params._equipmentId.toString());
  let player_id = event.params._playerId.toString();

  if (craft && equipment) {
    let treasureBalanceId = player_id.concat("-").concat(craft.treasure);
    let treasureBalance = TreasureBalance.load(treasureBalanceId);
    if (treasureBalance) {
      equipment.rank++;
      equipment.value = craft.value;
      equipment.name = craft.newName;
      equipment.uri = craft.uri;
      equipment.slot = craft.slot;
      equipment.save();
      treasureBalance.balance = treasureBalance.balance - 1;
      if (treasureBalance.balance == 0) {
        store.remove("TreasureBalance", treasureBalance.id);
      } else {
        treasureBalance.save();
      }
    }
  }
}

export function handleBasicCraftEvent(event: BasicCraftEvent): void {
  let craft = BasicCraft.load(event.params._craftId.toString());
  let equipment = Equipment.load(event.params._equipmentId.toString());

  if (equipment && craft) {
    equipment.rank++;
    equipment.value = craft.value;
    equipment.name = craft.newName;
    equipment.uri = craft.uri;
    equipment.save();
  }
}

export function handleLevelUpPatch(event: LevelUpPatchEvent): void {
  const players = [
    "1",
    "1419",
    "19",
    "273",
    "37",
    "391",
    "481",
    "59",
    "5902",
    "778",
    "1088",
    "1475",
    "257",
    "321",
    "331",
    "7166",
    "779",
    "340",
    "642",
    "643",
    "6904",
    "1338",
    "1423",
    "1735",
    "102",
    "333",
    "6907",
    "72",
    "1811",
    "386",
    "6884",
    "526",
    "6779",
    "6857",
    "6858",
    "6859",
    "6867",
    "6872",
    "6873",
    "6874",
    "6875",
    "6876",
    "714",
    "160",
    "313",
    "629",
    "99",
    "886",
    "177",
    "345",
    "158",
    "427",
    "236",
    "433",
    "43",
    "1173",
    "464",
    "447",
    "154",
    "1681",
    "938",
    "76",
    "1078",
    "259",
  ];
  let contract = OKP.bind(event.address);
  let player: Player | null;
  if (event.params.id.toString() == "99") {
    for (let i = 0; i < players.length; i++) {
      let contractPlayer = contract.getPlayer(BigInt.fromString(players[i]));
      if (contractPlayer.level >= BigInt.fromI32(1)) {
        player = Player.load(players[i]);

        if (player) {
          player.maxHealth = contractPlayer.health.toI32();
          player.currentHealth = contractPlayer.currentHealth.toI32();
          player.agility = contractPlayer.agility.toI32();
          player.strength = contractPlayer.strength.toI32();
          player.defense = contractPlayer.defense.toI32();
          player.magic = contractPlayer.magic.toI32();
          player.maxMana = contractPlayer.maxMana.toI32();
          player.currentMana = contractPlayer.mana.toI32();
          player.level = contractPlayer.level.toI32();
          player.exp = contractPlayer.xp.toI32();
          player.save();
        }
      }
    }
  }
}
