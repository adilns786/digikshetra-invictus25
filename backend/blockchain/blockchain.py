import hashlib
import time
import json

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
        self.chain = [self.create_genesis_block()]

    def create_genesis_block(self):
        return Block(0, str(time.time()), {"message": "Genesis Block"}, "0")

    def add_block(self, data):
        prev_block = self.chain[-1]
        new_block = Block(len(self.chain), str(time.time()), data, prev_block.hash)
        self.chain.append(new_block)

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

