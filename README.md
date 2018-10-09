
# Child Bot

After cloning the ChildBotTemplate Repo . Follow the below given steps for setting up the chatbot locally

## Environment Setup
1. Run the command `mkdir Logs`  in CMD @ the root folder 
2. Copy  emulator_ChatConnector file from Extra_Files folder to node_modules/botbuilder/lib/bots/ChatConnector.js and filename should be ChatConnector.js 
3. Copy local.env.txt file from Extra_Files folder and paste it to root folder as .env file.

## Bot framework setup

 1. Update the values of .env file in the root folder of the solution with appropriate credentials.
 2. Update the `"Confidence_Threshold"` value as required. This variable sets the threshold value for any dialog to get triggered in the bot framework.
 3. Update the `"knowledgeBaseId"` value with the knowledge base id of the QnA Maker that you will use.
 
#### Dialogs Folder
 4. The code is organized in such a way that every dialog is implemented in a separate node module file (.JS) and stored inside the Dialogs folder.
 5. "dialog.js" is a dialog router configuration file, where all the other dialog files are registered. (Example : Please refer to Line 15 to Line 22 , where dialogs implemented for software installations and QnA Maker are registered)
 6. "qna_dialog.js" file contains the implementation of QnA Maker dialog. You can use it as it is or update it as per your need.
 7. "precise_dialog.js" file contains the logic where bot is not very sure about the question asked (15% < Intent Score < 45 %), and prompts user to repeat the question with more precise words.
 8. Please refer to the "sampleDialog.js" dialog file inside "Other_Software_Installations" folder to understand how the dialog has to be implemented.
 9. If you plan to implement any Custom prompt in your solution, register those files in the "dialog.js" file as well. (Example : Refer to Line 36 - Line 44 ).
 
#### bot_reply.js 
 
 10. This is a helper file used in the solution to store all the generic responses used commonly across multiple dialog's.
 11. All the items in any given array are different variations of the same message that bot will pick randomly to respond back to the user.
 12. This module exports a JSON of functions, where each function picks the corresponding array's message in a random manner whenever invoked.
 
 #### logger.js
 
 13. This is very all the logic for log are written.
 14. We make use of winston Logger module to generate .log files.
 15. To log the transactions in MongoDB we have implemented the logic in "mongodb_config.js" file which is in Config folder of the solution.
 16. Please update the `info.message` JSON object to update the schema of the log (** Not Recommended ** ).
 17. To call this logger module below are the two syntax
	

    logger.info({session, args, botresponse}); // when you log a normal transaction
    logger.warn({"untrained_text": session.privateConversationData.AskedQuestion, "status": "answernotfound", session, bot_response}); // when you log any other types of transaction

 18. Please refer to the "sampleDialog.js" dialog file to get a better understanding on how logging is done.
