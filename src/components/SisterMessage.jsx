import React from 'react'

export default function SisterMessage() {
  return (
    <div className='w-full bg-primary rounded-full text-white text-xl font-Amaranth p-5 bg-white/25 flex'>
        <div className='h-full w-full p-5 '>
      <h1 className='p-8 sm:text-2xl font-bold md:text-5xl text-center'>Principal's Message</h1>
      
        <p className='p-5 text-justify rounded-full '>Our mission extends beyond academic excellence to provide a truly holistic
        education for each child entrusted to our care.
        At the heart of our educational philosophy is our commitment to nurture our
        students not only intellectually but also spiritually, emotionally, and socially.
        We strive to develop young minds who will go forth as good shepherdesses to
        the world, embodying the compassionate values of the Good Shepherd Sisters.
        Our dedicated staff works tirelessly to help students establish strong
        educational foundations while also cultivating their extracurricular talents
        and spiritual growth. We believe that a balanced education encompasses
        classroom learning, artistic expression, physical development, and a
        deepening relationship with God.
        We are blessed with a community that values both academic rigor and
        spiritual formation. Together, we guide our students to become thoughtful,
        compassionate, and capable individuals who will make positive contributions
        to our world.
        May God bless you and your families as we journey together in this sacred
        mission of education.
        In faith and service,<br />
        <div className='p-9 md:text-right sm:text-center'>
        Rev.Sr.Priyangani Hathurusinghe <br />
The Principal</div></p>
      </div>
      <div>
        <img src="./assets/img/Sister principal.jpeg" alt="" width={300} height={200} className='rounded-xl mt-48' />
      </div>
      
    </div>
  )
}
