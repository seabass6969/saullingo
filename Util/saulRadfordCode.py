import random

loop1=True

mode="IPA"

userns=["SaulR","Deshan"]
passs=["flumpies","12345"]
stages=[1,1]

l1flash1=["Hello","Good morning","How are You","Good bye","Good night"]
l1flash2=["neəni (nair-nee)","neə nɛlaweɪ (nair nel-ar-way)","teni al neə (te-nee arl nair)","nɪneɪ (ni-nay)","neə ɛɹæʒweɪ (nair e-raj-way)"]

l1q=["Which of these is Hello: neə nɛlaweɪ (nair nel-ar-way),nɪneɪ (ni-nay) or neəni (nair-nee). Type 1,2 or 3.","Which of these is Good night: nɪneɪ (ni-nay),neə ɛɹæʒweɪ (nair e-raj-way) or neə nɛlaweɪ (nair nel-ar-way). Type 1,2 or 3.","Which of these is How are you: teni al neə (te-nee arl nair), neəni (nair-nee) or neə nɛlaweɪ (nair nel-ar-way)","Match up the words: 1-Hello, 2-Goodbye, 3-How are you  A-nɪneɪ (ni-nay), B-teni al neə (te-nee arl nair), C- neəni (nair-nee) Give your answer in this form (1A,2B,3C).","Match up the words: 1-How are you, 2-Good night, 3-Good Morning  A-neə nɛlaweɪ (nair nel-ar-way), B-teni al neə (te-nee arl nair), C- neə ɛɹæʒweɪ (nair e-raj-way) Give your answer in this form (1A,2B,3C).","How would you write How are you Kynan? (write your answer phonetically)","How would you write Good Morning Cyll (write your answer phonetically)","How would you write Hello Kynan, Goodbye Mimiër. (you may write your answer in IPA or phonetically)"]
l1a=["3","2","1","1C,2A,3B","1B,2C,3A","tenee arl nair Kynan","nair nelaway Cyll","nairnee Kynan, neenay Mimiër"]

rep=[]

def incorrect1():
  loop2=True
  while loop2==True:
    print("Username or password entered incorrectly. You will have to Try again.")
    loop2=False
    print("")

def flashcards():
  for x in range(flash):
    loop3=True
    print(f"Flash Card {x+1}:")
    while loop3==True:
      print(l1flash1[x])
      print("")
      flip=input("to flip type any letter: ")
      if flip !="STOP":
        print("")
        print(l1flash2[x])
        print("")
        flip2=input("to flip type any letter to see next card type n: ")
        if flip2 == "n":
          loop3=False
          print("")
          if x+1 == flash:
            print("End of flashcards. Now try the end of lesson quiz.")
            lorq2="quiz"
        else:
          print("")

def quiz():
  loop4=True
  rep=[]
  if level==1:
    quiznum=l1q
  score=0
  for x in range(len(quiznum)):
    correct=False
    while loop4==False:
      rand=random.randint(1,len(quiznum))
      rand2=rand-1
      if l1q not in rep:
        loop4=False
        print(l1q[rand2])
        print("")
        answer=input("enter your answer:")
        if answer == l1a[rand2]:
          print("")
          print("Correct")
          correct=True
        else:
          print("")
          print("Incorrect")
          print(f"The correct answer was {l1a[rand2]}")
          overrule= input("Do you wish to overrule this:")
          if overrule == "Y":
            print("The answer has been changed to correct")
            correct=True
          else:
            correct=False
        if correct==True:
          score+=1
  print("")
  print("Test complete")
  print("")
  print(f"You scored {(score/len(quiznum))*100}%")

loop6=True
while loop6==True:
  begin=input("Welcome. To begin learning hɛɾɪnəʊ please type start, for additional information please type info, to change settings please type settings: ")
  print("")
  
  if begin == "start":
    accountin=input("Do you already have an account? ")
    print("")
    if accountin == "Y":
      while loop1==True:
        username=input("Enter your username (or type exit to leave): ")
        if username != "exit":
          password=input("Enter your password: ")
          if username in userns:
            accountnum=userns.index(username)
            if password in passs:
              if passs.index(password)==accountnum:
                stage=stages[accountnum]
                print("")
                print(f"Welcome {username}")
                level=stages[accountnum]
                loop1=False
              else:
                incorrect1()
            else:
              incorrect1()
          else:
            incorrect1()
        else:
          loop1=False
          accountin="N"
    if accountin=="N":
      print("You are continuing as a guest, your data will not be saved. To create an account please email 7102@george-spencer.notts.sch.uk (see info-accounts) for more detail")
      level=1
    if level == 1:
      print("")
      print("Topic 1- Greetings and Key phrases:")
      print("Lesson 1")
      print("")
      lorq=input("To learn the new vocabulary for this lesson type learn. To complete the end of lesson quiz type quiz: ")
      if lorq=="learn":
        print("")
        print("This lesson is on Greetings.")
        print("")
        print("neəni (nair-nee) - Hello")
        print("neə nɛlaweɪ (nair nel-ar-way) - Good Morning")
        print("nɪneɪ (ni-nay) - Good Bye")
        print("neə ɛɹæʒweɪ (nair e-raj-way) - Good Night")
        print("teni al neə (te-nee arl nair) - How are you? or Are you good?")
        print("")
        print("Kynan and Mimiër are having a conversation:")
        print("")
        print("Kynan: neəni")
        print("Mimiër: neə nɛlaweɪ")
        print("Kynan: teni al neə?")
        print("Mimiër: neɪ il neə. teni al neə?")
        print("Kynan: neɪ il neəʃ")
        print("Mimiër: neə ɛɹæʒweɪ!")
        print("Kynan: nɪneɪ")
        print("")
        lorq2=input("To continue learning using our flashcards type learn. If you feel ready to take on the end of lesson quiz type quiz.")
        if lorq2 == "learn":
          print("")
          flash=5
          flashcards()
        if lorq == "quiz" or lorq2=="quiz":
          print("")
          quiz()
      elif lorq == "quiz" or lorq2=="quiz":
        print("")
        quiz()
  elif begin == "info":
    print("Welcome to the information page.")
    print("")
    print("Please choose from the following:")
    print("The Cyll and the use of hɛɾɪnəʊ (Type Cyll)")
    print("The IPA (Type IPA)")
    print("Accounts (Type Accounts)")
    print("Information on code (Type Code)")
    print("")
    infoinp=input("Which information do you want to view? ")
    print("")
    if infoinp=="Cyll":
      print("The Cyll are a race who live on the Golden Isle in Valenia, they are named after their first Queen, Cyll, who founded the nation and the race alongside Kynan a druid prince. They are a community of elves and druids and speak the language known as hɛɾɪnəʊ (this is roughly pronounced he-ri-know) a dialect of elvish. They have their own script which is written using the long flexible reeds that grow on the islanf however as this can not be typed IPA (the International Phonetic Alphabet) has been used. If you have any questions on the race or language please contact 7102@george-spencer.notts.sch.uk.")
      print("")
      backin=input("Type back to return to the information page or home to return home.")
  elif begin == "settings":
    loop5=True
    print("Settings:")
    print("")
    print("To change write mode type write")
    print("")
    while loop5==True:
      setin=input("Type the setting you wish to view or type home to go home.")
      if setin=="write":
        if mode=="IPA":
          mode="phonetic"
        elif mode=="phonetic":
          mode="IPA"
        print(f"On repl the IPA cannot be typed. The write mode has been changed to {mode}")
      elif setin=="home":
        loop5=False
        print("")