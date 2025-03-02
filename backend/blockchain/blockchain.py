import hashlib
import time
import json
import redis
import datetime

redis_client = redis.StrictRedis(
    host="redis-12407.crce182.ap-south-1-1.ec2.redns.redis-cloud.com",  
    port=12407,  
    username="default",
    password="aWHHBWiwKtcPFSx5ECSgsmxUFG164av9",  
    decode_responses=True
)
###### New Implementation of Web3

import os
import json
from datetime import datetime
import hashlib

GLOBAL_LEDGER_FOLDER = "blockchain/ledgers/"


def create_genesis_block(dlid):
    folder = f"{GLOBAL_LEDGER_FOLDER}{dlid}/"
    if not os.path.exists(folder):
        os.makedirs(folder)
        genesis_block = {
            "property_id": dlid,
            "timestamp": str(datetime.now()),
            "transactions": [],
            "previous_hash": "0"
        }
        with open(folder + "genesis.json", "w") as file:
            json.dump(genesis_block, file)
    return folder

def add_transaction(dlid, seller, buyer, price):
    folder = create_genesis_block(dlid)
    transaction = {
        "seller": seller,
        "buyer": buyer,
        "price": price,
        "timestamp": str(datetime.now())
    }

    block_hash = hashlib.sha256(json.dumps(transaction).encode()).hexdigest()
    block_filename = f"{folder}block_{block_hash[:10]}.json"

    with open(block_filename, "w") as file:
        json.dump(transaction, file)

    return block_hash

######

class Block:
    def __init__(self, index, timestamp, data, previous_hash=''):
        self.index = index
        self.timestamp = timestamp
        self.data = json.dumps(data, sort_keys=True)
        self.previous_hash = previous_hash
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        block_string = f"{self.index}{self.timestamp}{self.data}{self.previous_hash}"
        return hashlib.sha256(block_string.encode()).hexdigest()


class Blockchain:
    def __init__(self):
        self.chain = []  # Initialize chain first
        self.load_chain()  # Load or create genesis block
        
    def load_chain(self):
        chain = redis_client.get("blockchain")
        if chain:
            self.chain = self.deserialize_chain(chain)
        if not self.chain:
            self.create_genesis_block()  # Create genesis block if chain is empty

    def hash_block(self, data):
        block_string = json.dumps(data, sort_keys=True)
        return hashlib.sha256(block_string.encode()).hexdigest()

    def create_genesis_block(self):
        genesis_block = Block(0, str(datetime.datetime.now()), "Genesis Block", "0")
        self.chain.append(genesis_block)
        self.save_chain(self.chain)


    def serialize_chain(self):
        blockchain = []
        for block in self.chain:
            blockchain.append({
                "index": block.index,
                "timestamp": block.timestamp,
                "previous_hash": block.previous_hash,
                "current_hash": block.hash,
                "data": json.loads(block.data)
            })
        return json.dumps(blockchain)


    def deserialize_chain(self, chain_data):
        blockchain = []
        blocks = json.loads(chain_data)
        for blk in blocks:
            block = Block(
                blk["index"],
                blk["timestamp"],
                blk["data"],
                blk["previous_hash"]
            )
            blockchain.append(block)
        return blockchain

    def save_chain(self, chain):
        redis_client.set("blockchain", self.serialize_chain())

    def add_block(self, data):
        prev_block = self.chain[-1]
        new_block = Block(len(self.chain), str(time.time()), data, prev_block.hash)
        self.chain.append(new_block)
        self.save_chain(self.chain)

    def verify_block(self, data):
        for block in self.chain:
            if json.loads(block.data) == data:
                return True
        return False

    def verify_chain(self):
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i - 1]

            # Check Previous Hash
            if current_block.previous_hash != previous_block.hash:
                return False

            # Check Hash Validity
            if current_block.hash != current_block.calculate_hash():
                return False

        return True

    def get_all_blocks(self):
        blockchain = []
        for block in self.chain:
            blockchain.append({
                "index": block.index,
                "timestamp": block.timestamp,
                "previous_hash": block.previous_hash,
                "current_hash": block.hash,
                "data": json.loads(block.data)
            })
        return blockchain

    def clear_chain(self):
        self.chain = []
        self.create_genesis_block()
        self.save_chain(self.chain)