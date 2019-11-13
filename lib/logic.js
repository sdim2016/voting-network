/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transaction processor functions here
 */

/**
 * Add vote to candidate, set voter status to voted
 * @param {org.xamk.MakeVote} MakeVote
 * @transaction
 */
function MakeVote(transaction) {
    //Get Voter:
    var voter = transaction.voter;
    //Get Candidate:
    var candidate = transaction.candidate;

    //If voter has already voted -> throw an Error.
    if (voter.voted) {
      throw new Error('Already voted');
    }

    //Add the vote to the candidate's votes
    candidate.votes += 1;

    //Get Candidate AssetRegistry:
    return getAssetRegistry('org.xamk.Candidate').then(function(CandidateRegistry) {
      //Get Participant AssetRegistry:
      getParticipantRegistry('org.xamk.Voter').then(function(participantRegistry) {
        //Set voted to true:
        voter.voted = true;
        //Update the Participant AssetRegistry:
        return participantRegistry.update(voter);
      }).catch(function(error) {
        //error handling could be added here
  });
  //Update the Candidate AssetRegistry:
  return CandidateRegistry.update(candidate);
});
}
